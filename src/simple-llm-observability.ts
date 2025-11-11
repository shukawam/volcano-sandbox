import { agent, llmOpenAI, createVolcanoTelemetry } from "volcano-sdk";

const serviceName = process.env.OTEL_SERVICE_NAME || "volcano-sandbox";
const otlpEndpoint =
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://localhost:4318";

const telemetry = createVolcanoTelemetry({
  serviceName: serviceName,
  endpoint: otlpEndpoint,
  traces: true,
  metrics: true,
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
    .then({ prompt: "Volcano SDKとはなんですか？" })
    .run();
  console.log(`[LLM Output]: ${results[0]?.llmOutput}`);
} catch (error) {
  throw new Error("The agent returned no results.");
}
