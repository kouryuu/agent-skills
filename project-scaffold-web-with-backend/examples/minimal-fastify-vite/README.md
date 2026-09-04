# Minimal Fastify + Vite reference

This is a deliberately small end-to-end slice, not a copy-and-run starter. Use current stable package versions and generate the OpenAPI client in the target repository; do not copy dependency versions from an example.

```text
apps/
  api/src/server.ts       # health, a versioned endpoint, and telemetry ingestion
  web/src/App.tsx         # calls the API through a narrow client
tests/e2e/health.spec.ts  # real-browser UI → API check
```

The example shows the minimum boundaries to preserve: input validation at the API, an explicit response shape, browser-visible failure handling, and a Playwright assertion. Add a generated OpenAPI document/client and structured request logging to the real scaffold as required by the baseline.

Start both applications with one top-level development command, point Vite's `/api` proxy at Fastify locally, and have Playwright start that full command rather than mocking the API.
