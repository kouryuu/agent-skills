# Full-stack baseline

## Frontend

- Current stable React + Vite + TypeScript with strict compiler settings.
- Keep routing, data fetching, and state management minimal until product needs justify libraries.
- Centralize API access in a generated typed client. Normalize transport failures into a small application error shape.
- Add an error boundary for render failures and listeners for `error` and `unhandledrejection`. Send sanitized reports with release, route template, error kind, message/fingerprint, correlation ID, and a bounded stack. Do not capture form values or arbitrary browser state.
- Prevent telemetry loops, deduplicate bursts, apply sampling/rate limits, and tolerate the collector being unavailable.

## API and contract

- Treat OpenAPI as the HTTP contract and serve or publish the generated document.
- Version product endpoints (for example `/api/v1`); keep operational health endpoints unversioned.
- Use one stable error envelope such as `{ "code": "invalid_input", "message": "...", "requestId": "...", "details": [...] }`. Codes are machine-stable; messages may be human-facing.
- Validate input at the network boundary and return documented status codes. Generate frontend types/client from the contract and fail CI on an uncommitted diff.
- Separate transport, application/domain logic, and external adapters only where this makes dependencies or tests clearer.

## Compact AI-readable observability

Default to newline-delimited JSON on stdout. Use OpenTelemetry-compatible trace context without requiring a hosted vendor. Prefer short, documented keys when log volume matters, but never make them cryptic:

```json
{"ts":"2026-01-01T00:00:00.000Z","lvl":"info","evt":"http.done","svc":"api","rid":"01...","trace":"...","method":"GET","route":"/api/v1/items/:id","status":200,"dur_ms":12}
{"ts":"2026-01-01T00:00:00.000Z","lvl":"error","evt":"ui.error","svc":"web","rid":"01...","release":"dev","route":"/items/:id","kind":"render","fingerprint":"...","msg":"..."}
```

Required common fields: timestamp, level, stable event name, service, environment, and release. Request events also carry request ID, trace context when available, route template rather than raw URL, status, and duration. Errors carry a stable kind/code and fingerprint. Emit stack traces only for unexpected errors, bounded to a configured size.

Use a small event vocabulary such as `app.start`, `app.stop`, `http.done`, `http.error`, `dependency.error`, and `ui.error`. Avoid start/end pairs for every successful request when one completion event suffices. Metrics should cover request count, error count, and latency; traces should propagate W3C Trace Context. Keep local defaults zero-config.

## Tests

- Browser-first: Playwright (or an existing equivalent) starts the real web and API services, uses an isolated test configuration, and covers the critical happy path plus one visible failure path.
- Unit: fast tests for domain rules, parsers/validators, redaction, and error mapping. Avoid unit-testing framework wiring.
- Contract: validate OpenAPI, regenerate the client, detect diffs, and test representative request/response/error examples against the running API where practical.
- Integration: use real lightweight dependencies or containers only when they add confidence; do not make every test an end-to-end test.

## Suggested acceptance checks

- Fresh checkout reaches a working page using documented commands.
- Strict typecheck and production builds pass.
- The browser test crosses UI → API → UI.
- A deliberately triggered UI exception produces one redacted `ui.error` event correlated with the session/request context.
- Contract regeneration is deterministic and leaves the tree clean.
- Logs are valid one-object-per-line JSON and contain no seeded secrets.
