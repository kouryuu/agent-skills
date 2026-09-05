# Telemetry integration points

Keep application events vendor-neutral at the call site. The browser should send a sanitized `ui.error` event to a same-origin collector by default; the API logs the event and may forward it through a server-side adapter. This avoids exposing ingest credentials and gives one place to redact, sample, and rate-limit.

## Selection matrix

| Option | Best fit | Integration point | Guardrails |
| --- | --- | --- | --- |
| Same-origin collector | Default; privacy and control matter | `POST /telemetry/events` on the API, then stdout JSON or a server adapter | Authenticate/session-bind if needed; redact, size-limit, and rate-limit before logging or forwarding. |
| Sentry | Error triage, stack grouping, releases | Browser SDK for explicitly approved client error capture; server SDK for API exceptions | Configure `beforeSend`/equivalent redaction, release/environment, sampling, and source maps. Never put secrets or user-entered fields in event extras. |
| Datadog | RUM/error tracking already standardized in the organization | Browser RUM/Error Tracking SDK; server logs/traces through the existing integration | Use organization-approved client tokens only; set service, environment, and release; review session replay/privacy defaults. |
| OpenTelemetry collector | Vendor portability and traces/metrics | API SDK exports OTLP to a collector; forward browser events through the API or a protected proxy | Browser OTLP needs CSP/CORS review and must not expose privileged headers. Prefer a reverse proxy/collector boundary over a public collector. |
| Custom endpoint | Existing internal event pipeline | A versioned API adapter behind the same normalized event schema | Define retries, response behavior, retention, and access control; make exporter failure non-blocking. |

## Adapter boundary

Normalize events once, then treat a vendor adapter as an optional sink:

```ts
type UiErrorEvent = {
  evt: "ui.error";
  ts: string;
  release: string;
  route: string;
  kind: "render" | "unhandled_rejection" | "window_error";
  fingerprint: string;
  msg: string;
  rid?: string;
};

interface TelemetrySink {
  reportUiError(event: UiErrorEvent): Promise<void>;
}
```

The collector owns payload validation, redaction, sampling, and bounded retries. It returns quickly (usually `202`) and must neither throw into the UI nor recursively report its own failures. Vendor-specific initialization belongs in a single adapter module, selected by configuration—not scattered through components or domain code.

## Vendor handoff checklist

- Preserve `service`, `environment`, `release`, request ID, trace context, and the stable event fingerprint across the adapter.
- Verify a deliberately triggered, sanitized browser error appears once; confirm no form values, credentials, or authorization headers are present.
- Configure CSP `connect-src` and CORS only for approved collector origins. Browser OTLP supports HTTP-based export, not gRPC; a same-origin proxy is often simpler.
- Keep source-map upload and vendor credentials in CI/server configuration, never in browser-visible environment variables unless the provider specifically designates the value as public.

See the current official vendor documentation before pinning a package or configuration: [Sentry JavaScript](https://docs.sentry.io/platforms/javascript/), [Datadog Browser Error Tracking](https://docs.datadoghq.com/real_user_monitoring/error_tracking/browser/), and [OpenTelemetry JavaScript exporters](https://opentelemetry.io/docs/languages/js/exporters/).
