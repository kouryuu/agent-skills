---
name: project-scaffold-web-with-backend
description: Create or upgrade a production-minded full-stack project scaffold with a current React/Vite frontend; a strongly typed TypeScript, Go, Rust, or Python backend; compact structured observability; browser-first tests; and explicit API contracts. Use when starting a web application, generating a reusable starter, or establishing baseline architecture and tooling. Do not use for frontend-only component work or small changes to an established project unless the user asks to adopt this baseline.
---

# Project Scaffold

Build a runnable foundation, not a pile of placeholder files. Preserve the user's product choices and adapt to an existing repository instead of replacing its conventions.

## Quick-start checklist

Use this checklist before creating files:

1. Inspect the repository for its package manager, runtimes, lockfiles, workspace layout, and existing API conventions.
2. Is this an established application? Keep its layout and backend unless the user explicitly asks to migrate it. Is it greenfield? Continue below.
3. Did the user name a backend language? Use it. Otherwise choose TypeScript and say why; select Fastify when no existing framework is preferred.
4. Do the web app and API live in one repository? Use a workspace layout such as `apps/web` and `apps/api`; otherwise keep each project's native layout and share the contract through a published/generated boundary.
5. Identify one end-to-end user-visible slice, its versioned API route, its OpenAPI schema, and its browser test before adding optional infrastructure.
6. Choose the telemetry transport: same-origin collector by default, a server-side vendor adapter where available, or an explicitly configured browser SDK only after reviewing privacy, CSP, CORS, and key exposure.

## When not to use this skill

Do not use this skill for:

- a frontend-only component, page, style, or interaction change with no backend contract;
- a small, isolated change in an established application that does not need a baseline/tooling migration;
- a disposable prototype where the requester explicitly values speed over the contract, observability, and test baseline this skill establishes.

## Resolve the shape

Inspect the workspace first. Determine the package manager, runtime/tool versions, existing conventions, and whether the directory is greenfield.

- Use the backend language the user names. If none is named and repository context does not decide it, use TypeScript for the lowest-friction shared contract workflow and state that choice.
- Use a workspace/monorepo layout when frontend and backend live together. Prefer `apps/web`, `apps/api`, and a generated or language-neutral contract boundary; do not force this layout onto an established repository.
- Before installing or pinning dependencies, determine current stable releases from official documentation or package registries. Respect an existing lockfile. Do not interpret “latest” as prerelease.
- Keep infrastructure proportional to the requested project. A scaffold may expose extension points without provisioning unrequested databases, queues, cloud services, or telemetry vendors.

Read [references/baseline.md](references/baseline.md) for the required architecture, observability, contracts, and test baseline. Read [references/backends.md](references/backends.md) only for the selected backend language.
Read [references/telemetry.md](references/telemetry.md) when selecting or configuring telemetry.

## Implement an end-to-end slice

Create enough real behavior to prove all boundaries work:

1. A Vite React TypeScript app renders a health/status view and calls the API through the typed contract.
2. The API exposes health/readiness plus one representative versioned endpoint, validation, documented error responses, and generated OpenAPI.
3. Frontend failures and unhandled promise rejections flow to a same-origin or configured telemetry endpoint after redaction and rate limiting. Make reporting non-recursive and non-blocking.
4. API requests and frontend error reports produce the compact structured events defined in the baseline.
5. A real-browser test exercises the UI through the running stack. Add focused unit tests for domain logic and a contract test that detects client/server drift.

Favor generated clients/types from OpenAPI over handwritten duplicate interfaces. If generation is impractical for the selected stack, validate the same schema on both sides and document the single source of truth.

## Documentation and developer experience

Provide concise, executable documentation:

- prerequisites and tool versions;
- install, development, test, lint, typecheck, build, and contract-generation commands;
- environment variables in a checked-in example file with safe values;
- architecture and observability notes, including how an AI agent can filter logs by request/trace ID;
- a short decision record for non-obvious framework or contract choices.

Offer one top-level command for each common workflow. Pin runtimes in conventional tool-version files when appropriate. Configure CI to run formatting/linting, type checks, unit/contract tests, production builds, and browser tests.

## Guardrails

- Enable the language's strict typing mode and treat type errors as build failures.
- Never log secrets, credentials, authorization headers, raw request bodies, or sensitive user data. Redact at the logger boundary.
- Use UTC timestamps, stable event names, bounded field sizes, and correlation IDs across browser and API.
- Keep normal logs single-line JSON and low-cardinality. Human prose belongs in documentation, not repeated log messages.
- Do not add mocks where the real local browser/API boundary is cheap to exercise. Do not pursue exhaustive unit coverage; concentrate it on deterministic domain behavior and failure paths.
- Avoid empty abstraction layers. Add interfaces at volatile or external boundaries, not around every function.

## Verify before handoff

Run the actual install, lint, typecheck, unit/contract tests, production build, and browser suite when the environment permits. Start the full stack and verify health plus frontend error ingestion. Report exact commands, what passed, and any check that could not run. Do not claim the scaffold is complete while generated contracts or lockfiles are stale.
