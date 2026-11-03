# ADR-001: Project Technology Stack and Service Boundaries

- Status: Accepted
- Date: 2026-11-03
- Agent-framework decision: PydanticAI
- Scope: Web application, control plane, data plane, database, ephemeral cache, and Python agent service

## Context and Proposal

TenderHunter requires a client-facing web application, a robust SaaS control plane, and an independent Python AI agent system. This record establishes the technology stack, service topologies, communication patterns, data boundaries, and the selection of PydanticAI as the primary agent framework.

| Component | Selected Technology | Role & Deployment |
| --- | --- | --- |
| **Frontend** | React + Vite | Decoupled client SPA deployed on Vercel; consumes REST & SSE |
| **Backend (Control Plane)** | Laravel (PHP) | REST API, authentication, RBAC, tenant management, stream grant issuance |
| **Agent Service (Data Plane)** | Python + FastAPI | Agent execution, MSC crawling, SSE live progress streaming, grant validation |
| **Agent Core** | PydanticAI | Typed tools, structured extraction, evaluation contracts, and validation |
| **Persistent Database** | PostgreSQL (Supabase) | Multi-schema persistence; schema-level ownership per service |
| **Ephemeral Cache & Queue** | Redis (Upstash) | Temporary tender session cache, rate-limiting, job queue |
| **Protocol Adapters** | FastMCP & A2A SDK | FastMCP (STDIO / Streamable HTTP) and A2A SDK (Agent Cards) |

---

## Architectural Decisions & Service Boundaries

### 1. Decoupled Client-Server Frontend
- **Decision**: React + Vite deployed as an independent Single-Page Application (SPA) on Vercel, interfacing with Laravel strictly via a stateless REST API.
- **Rationale**: An independent REST API was chosen over tight server-driven coupling (e.g., Inertia.js). This ensures the backend remains a reusable API gateway for future native/mobile applications without needing to re-engineer core endpoints from scratch.

### 2. Dual-Channel Control Plane and Streaming Data Plane
To prevent long-lived LLM inference and scraping operations from blocking PHP-FPM workers, the system separates control-plane operations from live streaming:
- **Control Plane (Laravel via HTTPS)**:
  - Manages user authentication, tenant boundaries, and RBAC.
  - Creates evaluation jobs and dispatches them.
  - Issues signed, short-lived "Stream Grants" (cryptographic JWT/HMAC tokens) authorizing clients to observe specific execution runs.
- **Data Plane (FastAPI via SSE)**:
  - Validates the client's Stream Grant.
  - Streams real-time agent thoughts, step progression, and token output using Server-Sent Events (SSE).
  - Handles client reconnects and event replay buffers.

```
[ Client: React + Vite (Vercel) ]
       |                                   |
   HTTPS (REST)                           SSE
       v                                   v
[ Laravel Control Plane ]        [ FastAPI Data Plane (SSE) ]
 - Auth / RBAC / Tenant           - Validate Stream Grant
 - Create Job                     - Live Progress Streaming
 - Issue Stream Grant             - Reconnect / Replay Buffer
```

### 3. Database Ownership & Schema Segregation
- **Database**: PostgreSQL hosted on Supabase.
- **Schema Ownership**:
  - `app` / `core` Schema: Strictly owned and migrated by Laravel (users, organizations, tenant configurations, permissions, audit logs).
  - `agent` Schema: Strictly owned and migrated by FastAPI (agent execution runs, prompt telemetry, structured evaluation records).
- **Access Boundary**: Neither service directly mutates tables owned by the other. Shared data needs are serviced via authorized internal APIs, preserving application-level and data-logic independence.

### 4. Ephemeral Caching & Compliance Storage (Redis / Upstash)
- **Decision**: Standalone Redis (hosted on Upstash for production).
- **Rationale & Legal Compliance**:
  - Under the MVP scope and Vietnamese procurement data regulations (Decree 13/2023/NĐ-CP), raw tender dossiers and scraped attachments must **not** be stored permanently.
  - Redis provides short-lived, TTL-backed session caching for active tender inquiries and rate-limiting buffers during MSC portal querying.

### 5. Agent Standalone Mode & Dual-Path Data Ingestion
The Python Agent Core is strictly decoupled from Laravel and capable of running in two distinct modes:
- **Standalone Mode (CLI / Direct MCP)**:
  - Loads contractor capability constraints and business profiles from validated local JSON/YAML configuration files or CLI flags.
  - Ingests runtime credentials (e.g., API keys, proxy settings) via environment variables.
  - Executes directly on the developer's machine or in CI pipelines without requiring a running Laravel instance or network access to the SaaS database.
- **SaaS Mode (Managed Service)**:
  - Laravel passes authorized, tenant-scoped contractor profiles to FastAPI via authenticated internal API requests.
- **Shared Core**: Both modes share the exact same PydanticAI Agent Core, document parsing pipelines, and matching algorithms.

### 6. Interoperability: FastMCP & A2A Interface Adapters
- **MCP (Model Context Protocol)**:
  - Built using the official Python MCP SDK with **FastMCP**.
  - Exposes agent tools (`search_msc`, `evaluate_suitability`, `audit_risks`) over **STDIO** for local agent integration (e.g., Claude Code, Cursor) and **Streamable HTTP** with token authentication for remote SaaS consumers.
- **A2A (Agent-to-Agent)**:
  - Implemented as an independent adapter layer using the official A2A SDK and authenticated Agent Cards for discovery and multi-agent coordination.
- MCP and A2A function as non-invasive external protocol adapters wrapped around the core PydanticAI agent.

---

## Agent-Core Selection and Alternatives

PydanticAI is selected as the primary agent framework due to its typed dependency injection, robust schema enforcement, and seamless FastAPI/Starlette integration.

| Candidate / Outcome | Evaluation Focus | Trade-Off to Investigate |
| --- | --- | --- |
| **PydanticAI** *(Selected)* | Typed tools, structured extraction, schema validation, and native FastAPI SSE integration | Recovery requirements and external durable execution integration |
| **LangGraph** | Explicit state, branching, persistent checkpoints, and review interrupts | Workflow complexity, checkpoint configuration, and maintenance effort |
| **LlamaIndex** | Retrieval, document evidence, structured extraction, and agent workflows | Document/retrieval abstraction fit for lightweight MVP needs |
| **Haystack** | Composable retrieval and processing pipelines with tool-using agents | Pipeline composition overhead and fit for the agent service |
| **CrewAI** | Role-based agents and controlled Flows | Multi-agent coordination overhead, latency, and token consumption |

---

## Points for Future Refinement

The following implementation specifics remain for detailed design in subsequent ADRs (such as ADR-002):

- Specific LLM provider selection and fallback chains (e.g., Gemini 1.5 Flash/Pro vs. self-hosted open weights).
- Fine-grained Stream Grant signing protocol (e.g., EdDSA vs. HMAC-SHA256) and replay buffer size.
- Exact telemetry, error tracking, and audit log retention configurations.
- Upstash Redis TTL eviction policies for temporary tender caching.
