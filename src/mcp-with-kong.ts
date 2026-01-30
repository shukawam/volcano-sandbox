import { agent, llmOpenAI, mcp, createVolcanoTelemetry } from "volcano-sdk";

const gatewayEndpoint = process.env.GATEWAY_ENDPOINT || "http://localhost:8000";
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

const catalogueTool = mcp(`${gatewayEndpoint}/catalogue`, {
  auth: {
    type: "bearer",
    token: "admin-key"
  }
});

const steps = await agent({ llm, telemetry })
  .then({
    prompt: "管理しているカタログの製品情報の一覧を取得してください",
    mcps: [catalogueTool], // Automatic tool selection
  })
  .then({
    prompt: "製品情報のサマリーを作成してください",
  })
  .run();

steps.forEach((step) => {
  console.log(`[Tool call] ${step.toolCalls}`);
  console.log(`[LLM output] ${step.llmOutput}`);
});
