import { agent, llmOpenAI, createVolcanoTelemetry } from "volcano-sdk";

const serviceName = process.env.OTEL_SERVICE_NAME || "volcano-sandbox";
const otlpEndpoint =
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://localhost:4318";
const gatewayEndpoint = process.env.GATEWAY_ENDPOINT || "http://localhost:8000";

const telemetry = createVolcanoTelemetry({
  serviceName: serviceName,
  endpoint: otlpEndpoint,
  traces: true,
  metrics: true,
});

const llm = llmOpenAI({
  apiKey: "dummy-api-key",
  model: "gpt-4o-mini",
  baseURL: `${gatewayEndpoint}/openai`,
});

try {
  const results = await agent({
    llm,
    telemetry, // Enable observability feature.
  })
    .then({ prompt: "Volcano SDKとはなんですか？" })
    .run();
  results.forEach((step, index) => {
    console.log(`[Step ${index + 1}]`);
    console.log(`[Tool call] ${step.toolCalls}`);
    console.log(`[LLM output] ${step.llmOutput}`);
  });
} catch (error) {
  throw new Error("The agent returned no results.");
}
