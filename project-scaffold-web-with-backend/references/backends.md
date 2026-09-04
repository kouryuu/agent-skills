# Backend selection notes

Choose current stable, maintained packages after checking official sources. These are decision defaults, not mandatory replacements for repository conventions.

## TypeScript

Use a supported Node.js LTS release, strict TypeScript, and a framework with schema-driven validation/OpenAPI support. Fastify is a good lean default; an established NestJS/Hono/Express codebase should keep its framework. Prefer a runtime schema library that can be the source for both validation and OpenAPI. Use structured logging with request IDs and OpenTelemetry-compatible instrumentation.

## Go

Use the current stable Go toolchain. Prefer the standard library plus a small router such as `chi`, explicit request/response structs, and OpenAPI generation/validation that fails loudly on drift. Use `log/slog` JSON output with a redacting wrapper and OpenTelemetry instrumentation. Keep interfaces consumer-owned and narrow.

## Rust

Use stable Rust and a minimal async HTTP stack such as Axum/Tokio. Model input/output with Serde and derive OpenAPI with a maintained integration such as utoipa. Use `tracing` with JSON formatting and OpenTelemetry propagation. Make domain errors typed and map them once at the HTTP boundary.

## Python

Use a current supported Python release and strict static checking. FastAPI with Pydantic is a practical default because runtime validation and OpenAPI are integrated. Use `uv` when no package workflow exists, Ruff for lint/format, and Pyright or mypy in strict mode. Configure standard logging or structlog for newline-delimited JSON and instrument with OpenTelemetry. Keep async/sync boundaries deliberate.

## Language-neutral expectations

Whichever language is selected:

- lock dependencies and pin the runtime/toolchain conventionally;
- provide graceful shutdown and separate liveness/readiness behavior;
- validate configuration at startup with actionable errors;
- generate accurate OpenAPI including the shared error envelope;
- use cancellation/timeouts for outbound work;
- document public packages/modules and non-obvious decisions, while avoiding comments that merely restate code.
