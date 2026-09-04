import Fastify from "fastify";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const telemetryEvent = z.object({
  evt: z.literal("ui.error"),
  kind: z.enum(["render", "unhandled_rejection", "window_error"]),
  msg: z.string().max(512),
  fingerprint: z.string().max(128),
  route: z.string().max(256),
  release: z.string().max(128),
});

export const app = Fastify({ logger: true });

app.get("/healthz", async () => ({ status: "ok" }));
app.get("/api/v1/status", async () => ({ message: "API is ready" }));

app.post("/telemetry/events", async (request, reply) => {
  const event = telemetryEvent.parse(request.body);
  request.log.error({ ...event, evt: "ui.error" }, "sanitized browser error");
  return reply.code(202).send();
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await app.listen({ port: 3000, host: "0.0.0.0" });
}
