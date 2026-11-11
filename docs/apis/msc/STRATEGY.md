# Tender-search API discovery and validation strategy

## WHAT

The in-scope surface is the four JSON services observed on the public contractor-selection search page. The routes are undocumented frontend services, not an official API product.

| Operation | Data returned | Dependency in the UI | Verification boundary |
|---|---|---|---|
| searchPublicTenders | page.content tender summaries, including notification identifiers, names, dates, investor fields, form, price, and location data | Search form and filters feed this call; record identifiers build public detail-page links | One anonymous public UI request returned HTTP 200. Direct calls and tokenless calls are unverified. |
| getSearchCategories | categories object keyed by category type, with code and localized names | Advanced filter controls use these values | Two public-page requests returned HTTP 200; other category combinations are unverified. |
| getSearchAreas | areas array with geographic code, name, parent, and metadata | Geographic filter controls use area codes and names | One top-level area query returned HTTP 200; child levels are unverified. |
| getPopularSearchKeywords | Paged keyword entries and observed page metadata | Popular-keyword controls populate or start a search | One request returned HTTP 200 with seven entries; other sorts and pages are unverified. |

The dependencies are: category and area results populate optional filters; popular keywords provide search suggestions; the search operation returns notice identifiers and summary data. The UI builds a public detail-page URL from result data, but this work did not identify or verify a separate detail-data API.

Out of scope: authenticated bidding, account workflows, hidden or administrative services, the legacy eGP search surface, detail-page crawling, solver or bypass logic for CAPTCHA, and bulk extraction. This inventory describes the current search-page flow only; it is not an inventory of every service on the portal.

## WHY

The portal itself constructs the search request and supplies its transient token. Playwright page response events are the appropriate observation point for this UI-only operation because they capture the normal response without reconstructing token logic. The test uses page routing to return local fixtures so contract cases do not send extra requests to the portal.

Playwright APIRequestContext is used for the three filter services in the typed client when a caller has an authorized same-origin session. It gives request and response objects that can be checked against the OpenAPI-aligned Zod schemas. The project does not claim those calls work outside the browser session; the live evidence came from requests made by the portal page.

Zod is used for runtime validation and inferred TypeScript types. Known fields are checked for their observed JSON types. Unknown keys are retained and surfaced as informational drift because the observed portal objects are open-ended and the spec declares additionalProperties true. Invalid known fields fail parsing. This preserves forward compatibility without silently discarding new public data.

Implementation references consulted through Context7: [Playwright network events](https://playwright.dev/docs/network), [Playwright APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext), [Playwright HTML reporter](https://playwright.dev/docs/test-reporters), [Zod](https://zod.dev/), and [Redocly lint](https://redocly.com/docs/cli/commands/lint).

The optional live test attaches a sanitized HAR 1.2 entry. Its URL keeps the token parameter name but replaces every query value, its cookie arrays are empty, its header allowlist excludes Cookie and Set-Cookie, the request-body summary omits search keywords and filter values, and the response body contains only field names and counts. The project never writes a raw HAR, since it would contain a transient token, browser cookies, and record identifiers.

Automated probes for 4xx/5xx, empty results, or malformed payloads would create unsupported traffic or depend on changing production data. Those cases run against a local HTTP fixture server. No Schemathesis, Prism, or Dredd layer is used because generated traffic against an undocumented endpoint adds load and cannot validate unknown portal behavior better than the captured-contract tests.

## HOW

### Request and browser handling

- The client accepts an injected Playwright APIRequestContext and a base URL. A caller authorized to use filter services can pass the browser context's request object to share its cookie jar.
- Every direct request gets the descriptive MSC-Tender-Hunter-Agent/0.1 User-Agent, JSON Accept header, a bounded timeout, a configurable concurrency cap (one by default), a configurable request budget, and a default two-second minimum spacing.
- Search uses the ordinary portal page. The helper waits for the visible search response with a page response listener, validates the status and JSON shape, and never reads or persists the token.
- 403, 401, 429, and CAPTCHA or challenge signals stop the run. No token is fabricated or replayed. A 429 is surfaced without automatic retry; operators must honor Retry-After before making any new request. Bounded backoff is available for transient 502/503/504 responses only, and the retry count is configurable.
- Pagination uses the observed search request fields (pageSize and string pageNumber). Search response metadata names were not confirmed. The provided iterator therefore stops on an empty or short page and has configurable maxPages, maxRequests, and delay limits. It is intended for fixture validation until the portal confirms automated collection permission. The observed popular-keyword response has separate metadata (totalPages, currentPage, and related fields); do not assume its pagination contract applies to tender search.

### Parsing, normalization, and drift

Each operation has a request schema and response schema aligned to openapi.yaml. Parsers accept unknown fields but record their paths, normalize tender identifiers (notifyNoStand then notifyNo), join the observed bidName array into a title, and retain the original validated record for callers that need source fields. Timestamps remain strings because observed values have no timezone suffix and do not satisfy a strict RFC 3339 date-time contract.

Every response is validated before normalization. A known-field type mismatch throws a contract-validation error. Unknown keys are preserved and included in a drift summary; they are not schema failures while the corresponding OpenAPI object remains open to additional properties. Tests assert both behaviors. The OpenAPI linter, TypeScript compiler, and Playwright tests run as separate checks so a failure identifies the layer that drifted.

### Test cases and evidence

Default tests use local fixtures only. They cover happy paths for all four operations, malformed request/response validation, 4xx and 5xx handling, empty search results, pagination termination and caps, and unknown fields. Browser capture tests use page routing against a local fixture origin. An optional @live test performs a single ordinary UI search only when MSC_LIVE_TEST=1; it is skipped by default and has no challenge-solving behavior.

The live observations were made with Google Chrome DevTools. Request IDs and status are in openapi.yaml and VALIDATION_REPORT.md; raw URLs, cookies, tokens, organization account codes, and complete unredacted response bodies are not stored.

## WHEN

| Phase | Entry criteria | Work and parallelism | Exit criteria |
|---|---|---|---|
| 1. Spec audit | Existing OpenAPI and README read in full | Compare known routes, payloads, fields, errors, pagination, and examples. This audit is sequential because it sets the evidence baseline. | Gaps and unverified claims are listed. |
| 2. Discovery and recon | Search-page flow is publicly reachable; robots.txt has been checked | Inspect one normal UI search and the filter requests in Chrome DevTools. Do not replay tokens. Browser UI and official policy search can be separate read-only work. | Request IDs, status, body shapes, and safety boundary are recorded without secrets. |
| 3. Client and parser | Operation shapes are described in the spec | Implement the bounded APIRequestContext client, UI response capture, Zod parsers, normalizer, and page iterator. | Types and parser behavior match the documented observed shapes. |
| 4. Per-operation tests | Client and fixtures exist | Run each operation against the local fixture server; include malformed input, error status, empty data, pagination edges, and unknown fields. These tests can be split by operation, but run serially to keep the local server deterministic. | All local cases pass; no live requests are needed. |
| 5. Crawl and parse policy | Search pagination inputs are known; response metadata remains uncertain | Validate iterator bounds and parsing against fixtures. Run live collection only after portal permission and keep it opt-in, sequential, and capped. | Bounds are enforced; live bulk collection remains disabled absent permission. |
| 6. Spec reconciliation | Test and DevTools evidence are available | Compare schemas to observed examples, keep unobserved error and search-page metadata explicit, and update operation evidence. | Redocly lint and TypeScript validation pass with no spec errors. |
| 7. Report | Reconciliation is complete | Record operation status, evidence, test results, and discrepancies. | VALIDATION_REPORT.md matches the final spec and suite output. |

## Reproduction

From docs/apis, run npm ci, npx playwright install chromium, npx playwright test, npx redocly lint --extends=minimal openapi.yaml, and npx tsc --noEmit. The Playwright HTML report is written to playwright-report/, with traces in test-results/.
