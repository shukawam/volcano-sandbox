import { agent, llmOpenAI, mcp } from "volcano-sdk";

const gatewayEndpoint = process.env.GATEWAY_ENDPOINT || "http://localhost:8000"

const llm = llmOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-4o-mini",
});

const catalogueTool = mcp(`${gatewayEndpoint}/catalogue`)

const steps = await agent({llm})
    .then({
        prompt: "管理しているカタログの製品情報の一覧を取得してください",
        mcps: [catalogueTool], // Automatic tool selection
    })
    .then({
        prompt: "製品情報のサマリーを作成してください"
    })
    .run()

steps.forEach(step => {
    console.log(`[Tool call] ${step.toolCalls}`)
    console.log(`[LLM output] ${step.llmOutput}`)
});
