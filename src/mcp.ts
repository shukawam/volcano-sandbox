import { agent, llmOpenAI, mcp, createVolcanoTelemetry } from "volcano-sdk";

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

const revenueTool = mcp("http://localhost:8080/mcp");

const steps = await agent({ llm, telemetry })
  .then({
    prompt: "売上Top3を教えてください。",
    mcps: [revenueTool], // Automatic tool selection
  })
  .run();

steps.forEach((step) => {
  console.log(`[Tool call] ${step.toolCalls}`);
  console.log(`[LLM output] ${step.llmOutput}`);
});
