# Public tender-search service research

This folder contains an evidence-based OpenAPI description and an isolated TypeScript/Playwright contract-test project for the public search pages on the [National e-Procurement Portal](https://muasamcong.mof.gov.vn/web/guest/home).

## Finding

Chrome DevTools observed four same-origin JSON operations in the public contractor-selection search flow. Each returned HTTP 200 in the observed browser session: tender search, search categories, geographic areas, and popular keywords. The routes are frontend services, not a versioned API documented by the portal. The search request included a portal-issued transient query token, and the page loaded reCAPTCHA. The search operation is therefore verified only through the normal public UI flow; this project does not mint, persist, replay, or bypass that token or any challenge.

All four observed browser requests carried portal cookies. The captures do not establish that any cookie is required, so the specification lists the Cookie header as optional and stores no cookie values.

The site's robots.txt returned User-Agent: * and an empty Disallow value. A portal-specific automated-use policy or service rate limit was not found in the official search performed for this work. Before scheduled or high-volume collection, confirm permission with portal support (1900 6126 or hotro@muasamcong.gov.vn). Stop on access denial, CAPTCHA challenge, 429, or other anti-automation signal.

## Files

- openapi.yaml is the standalone source of truth. It describes only observed request and response shapes, with operation-level verification evidence and explicit unknowns.
- STRATEGY.md records the inventory, safety choices, implementation details, and execution phases.
- DECISIONS.md records contract and implementation trade-offs.
- VALIDATION_REPORT.md lists operation status, evidence, tests, and unresolved discrepancies.
- This folder is a self-contained Playwright TypeScript project. Its tests use local fixtures by default; an explicitly gated live UI smoke test is available.

## Run the local validation suite

From this folder:

    npm ci
    npx playwright install chromium
    npx playwright test
    npx redocly lint --extends=minimal openapi.yaml
    npx tsc --noEmit

The Playwright run writes an HTML report to playwright-report/ and traces to test-results/. Open the report with npx playwright show-report.

The optional live smoke test makes one public UI search request and is not enabled by default. In PowerShell, opt in with:

    $env:MSC_LIVE_TEST = "1"
    npx playwright test tests/live-portal.spec.ts --grep @live

The live test uses the normal UI, never calls the search endpoint directly, and does not solve or dismiss a CAPTCHA. If the portal shows a challenge or denies the request, stop and record that result. A successful opt-in run attaches a sanitized HAR entry with token values, cookies, search terms, filter values, and tender record contents removed.

## Support

The portal page lists the National Public Procurement Network support line at 1900 6126 and hotro@muasamcong.gov.vn.
