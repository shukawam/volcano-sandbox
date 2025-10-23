import { agent, llmOpenAI, createVolcanoTelemetry } from "volcano-sdk";

import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const serviceName = process.env.OTEL_SERVICE_NAME || "volcano-sandbox";
const otlpEndpoint =
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://localhost:4318";

const sdk = new NodeSDK({
  serviceName: serviceName,
  traceExporter: new OTLPTraceExporter({
    url: `${otlpEndpoint}/v1/traces`,
  }),
});

sdk.start();

// Graceful shutdown
process.on("SIGTERM", async () => {
  await sdk.shutdown();
});

const telemetry = createVolcanoTelemetry({
  serviceName: serviceName,
});

const llm = llmOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-4o-mini",
});

try {
  const results = await agent({
    llm,
    telemetry, // Enable observability feature.
  })
    .then({ prompt: "what is volcano sdk?" })
    .run();
  const firstResult = results[0];
  if (!firstResult || !firstResult.llmOutput) {
    throw new Error("The agent returned no results.");
  }
  console.log(firstResult.llmOutput);
} catch (error) {
  throw new Error("The agent returned no results.");
}
