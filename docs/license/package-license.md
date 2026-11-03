# Package License and MPL-2.0 Compliance Audit

- Date: 2026-11-03
- Project License: **Mozilla Public License Version 2.0 (MPL-2.0)**
- Audit Scope: Codebase dependencies, CI/CD workflows, and architectural framework selections [ADR-001](../adrs/ADR-001-technology-stack.md), [ADR-002](../adrs/ADR-002-system-architecture.md)

## 1. Compliance Framework: Mozilla Public License 2.0

The project source code is licensed under the **Mozilla Public License Version 2.0 (MPL-2.0)** as set forth in [`LICENSE`](./MPL-V2.md). 

### Key MPL-2.0 Rules for External Packages
1. **File-Level Copyleft**: MPL-2.0 applies strictly at the file boundary (Sections 1.4 and 3.1). Any modification to an MPL-covered file must remain under MPL-2.0.
2. **Larger Works (Section 3.3)**: MPL-covered files may be freely combined with separate files governed by different open-source or proprietary licenses to create a "Larger Work", provided the MPL terms continue to be fulfilled for the MPL-covered files.
3. **Compatibility**:
   - **Permissive Licenses** (MIT, Apache 2.0, BSD-2/3-Clause, PSFL, PostgreSQL License): Fully compatible. They impose no copyleft restrictions on surrounding files.
   - **Service and API Boundaries**: Software consumed across network boundaries (e.g., Supabase PostgreSQL, Upstash Redis, independent REST/SSE microservices) does not combine source code into a single derivative work.
   - **Strong Copyleft** (GPLv2/v3, AGPLv3): Requires legal review if statically or dynamically linked into the same binary or module.

## 2. Package and Framework License Audit Table

The following table summarizes all packages, libraries, and frameworks currently in the codebase (detected via Graphify AST) or architected for the platform ([ADR-001](../adrs/ADR-001-technology-stack.md) and [ADR-002](../adrs/ADR-002-system-architecture.md)):

| ID | Package Name | Usage | Location | MPL Violation (yes/no/review) |
| :--- | :--- | :--- | :--- | :--- |
| **PKG-001** | `PyYAML` (v6.0.3) | YAML schema parsing for repository validation | `.gitlab-ci.yml`, `scripts/ci/validate_repository.py` | **no** |
| **PKG-002** | `Python Standard Library` | Core runtime modules (`ast`, `pathlib`, `json`, `os`, `re`, `subprocess`, `sys`, `time`, `urllib`) | `scripts/ci/gitlab_bridge.py`, `scripts/ci/validate_repository.py` | **no** |
| **PKG-003** | `actions/checkout` (v4) | GitHub Actions repository checkout step | `.github/workflows/gitlab-ci.yml` | **no** |
| **PKG-004** | `actions/setup-python` (v5) | GitHub Actions Python environment configuration | `.github/workflows/gitlab-ci.yml` | **no** |
| **PKG-005** | `React` (v19) | Frontend user interface framework | `docs/adrs/ADR-001-technology-stack.md`, `docs/adrs/ADR-002-system-architecture.md` | **no** |
| **PKG-006** | `Vite` (v6) | Frontend asset bundler and dev server | `docs/adrs/ADR-001-technology-stack.md`, `docs/adrs/ADR-002-system-architecture.md` | **no** |
| **PKG-007** | `Laravel` (v11/12) | Control plane backend (Auth, RBAC, tenant data, REST API) | `docs/adrs/ADR-001-technology-stack.md`, `docs/adrs/ADR-002-system-architecture.md` | **no** |
| **PKG-008** | `FastAPI` | Agent data plane service and SSE live streaming API | `docs/adrs/ADR-001-technology-stack.md`, `docs/adrs/ADR-002-system-architecture.md` | **no** |
| **PKG-009** | `PydanticAI` | Primary agent framework for structured extraction and evaluation | `docs/adrs/ADR-001-technology-stack.md`, `docs/adrs/ADR-002-system-architecture.md` | **no** |
| **PKG-010** | `Pydantic` (v2) | Data validation, contract typing, and schema enforcement | `docs/adrs/ADR-001-technology-stack.md`, `docs/adrs/ADR-002-system-architecture.md` | **no** |
| **PKG-011** | `FastMCP` | Model Context Protocol SDK for STDIO and Streamable HTTP tools | `docs/adrs/ADR-001-technology-stack.md`, `docs/adrs/ADR-002-system-architecture.md` | **no** |
| **PKG-012** | `curl_cffi` | TLS-impersonating HTTP client for MSC portal scraping | `docs/adrs/ADR-001-technology-stack.md`, `docs/adrs/ADR-002-system-architecture.md` | **no** |
| **PKG-013** | `PostgreSQL` | Relational persistence hosted on Supabase (`app` and `agent` schemas) | `docs/adrs/ADR-001-technology-stack.md`, `docs/adrs/ADR-002-system-architecture.md` | **no** |
| **PKG-014** | `Redis` | Ephemeral session caching and short-lived SSE replay buffer | `docs/adrs/ADR-001-technology-stack.md`, `docs/adrs/ADR-002-system-architecture.md` | **review** |
| **PKG-015** | `A2A SDK` | Agent-to-Agent protocol adapter and Agent Cards interface | `docs/adrs/ADR-001-technology-stack.md`, `docs/adrs/ADR-002-system-architecture.md` | **no** |



## 3. Package License Verification and Compliance Rationale

### PKG-001: `PyYAML`
- **Detected License**: **MIT License**
- **Verification**: Verified via Context7 (`/yaml/pyyaml`).
- **MPL Compatibility**: **Compatible (No Violation)**. Permissive license. When linked or imported in Python scripts, it forms a Larger Work under Section 3.3.

### PKG-002: `Python Standard Library`
- **Detected License**: **Python Software Foundation License (PSFL)**
- **Verification**: Python official license.
- **MPL Compatibility**: **Compatible (No Violation)**. PSFL is a permissive, OSI-approved open-source license compatible with MPL-2.0.

### PKG-003 and PKG-004: `actions/checkout` and `actions/setup-python`
- **Detected License**: **MIT License**
- **Verification**: GitHub Official Actions repository.
- **MPL Compatibility**: **Compatible (No Violation)**. These are external CI runner actions that execute independently in the GitHub Actions runner environment.

### PKG-005 and PKG-006: `React` and `Vite`
- **Detected License**: **MIT License**
- **Verification**: Meta Open Source (React) and Vite Core Team.
- **MPL Compatibility**: **Compatible (No Violation)**. Distributed as compiled frontend JavaScript bundles from Vercel; fully permissive.

### PKG-007: `Laravel`
- **Detected License**: **MIT License**
- **Verification**: Taylor Otwell / Laravel framework repository.
- **MPL Compatibility**: **Compatible (No Violation)**. Permissive backend framework operating as an independent control-plane service.

### PKG-008: `FastAPI`
- **Detected License**: **MIT License**
- **Verification**: Verified via Context7 (`/websites/fastapi_tiangolo`).
- **MPL Compatibility**: **Compatible (No Violation)**. Permissive ASGI web framework.

### PKG-009 and PKG-010: `PydanticAI` and `Pydantic`
- **Detected License**: **MIT License**
- **Verification**: Verified via Context7 (`/pydantic/pydantic-ai`).
- **MPL Compatibility**: **Compatible (No Violation)**. Permissive agent and data validation libraries.

### PKG-011: `FastMCP`
- **Detected License**: **Apache License 2.0**
- **Verification**: Verified via Context7 (`/prefecthq/fastmcp`).
- **MPL Compatibility**: **Compatible (No Violation)**. Apache-2.0 is compatible with MPL-2.0 when combined into a Larger Work. Neither license attempts to alter the other's source files.

### PKG-012: `curl_cffi`
- **Detected License**: **MIT License**
- **Verification**: Verified via Context7 (`/lexiforest/curl_cffi`).
- **MPL Compatibility**: **Compatible (No Violation)**. Permissive wrapper around `curl-impersonate`.

### PKG-013: `PostgreSQL`
- **Detected License**: **PostgreSQL License** (BSD/MIT-style permissive)
- **Verification**: PostgreSQL Global Development Group.
- **MPL Compatibility**: **Compatible (No Violation)**. Remote managed database engine accessed over standard TCP/connection pooler.

### PKG-014: `Redis`
- **Detected License**: **RSALv2 / SSPLv1** (Redis server 7.4+); **MIT License** (`redis-py` client library); **BSD-3-Clause** (Redis <= 7.2.4 / Valkey).
- **Verification**: Redis Ltd. licensing transition.
- **MPL Compatibility**: **Review**:
  - *SaaS Cloud Deployment*: Our architecture accesses Redis as a hosted managed service (**Upstash**) via network calls using the MIT-licensed `redis-py` client. This creates **no license violation**.
  - *Self-Hosting Caution*: If self-hosting standalone Redis 7.4+ on-premise, ensure that Redis binaries are not bundled or distributed within an MPL-covered distribution, or use the BSD-3-Clause fork **Valkey** to avoid SSPL/RSAL commercial redistribution clauses.

### PKG-015: `A2A SDK`
- **Detected License**: **Apache License 2.0 / MIT**
- **Verification**: Official A2A protocol specification.
- **MPL Compatibility**: **Compatible (No Violation)**. Protocol adapter layer interfacing external agents.



## 4. Compliance Checklist for Project Developers

1. **Preserve Copyright and License Notices**: Always retain existing copyright notices in all third-party dependencies and Python wheels.
2. **MPL Source Header Requirement**: Any new Python source files or modifications to MPL-covered files in this repository should retain the notice in Exhibit A:
   ```
   This Source Code Form is subject to the terms of the Mozilla Public
   License, v. 2.0. If a copy of the MPL was not distributed with this
   file, You can obtain one at https://mozilla.org/MPL/2.0/.
   ```
3. **Larger Work Boundary**: The separation of the frontend (Vercel), Laravel backend, and FastAPI agent service into independent services and directories cleanly satisfies the "Larger Work" boundary under Section 3.3 of the MPL-2.0.
