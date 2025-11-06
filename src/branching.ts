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

const input = "What is the Earth?";

const result = await agent({
  llm,
  telemetry, // Enable observability feature.
})
  .then({
    prompt: `入力された文章は、日本語ですか？ "${input}" YESかNOで答えてください。`,
  })
  .branch(
    (history) => history[0]?.llmOutput?.toUpperCase().includes("YES") || false,
    {
      true: (a) => a.then({ prompt: `与えられた文章を英語にしてください。"${input}"` }),
      false: (a) => a.then({ prompt: `与えられた文章を日本語にしてください。"${input}"` }),
    }
  )
  .run();

result.forEach((step) => {
  console.log(`[Tool call] ${step.toolCalls}`);
  console.log(`[LLM output] ${step.llmOutput}`);
});
