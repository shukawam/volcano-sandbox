import { agent, llmOpenAI, mcp } from "volcano-sdk";

const gatewayEndpoint = process.env.GATEWAY_ENDPOINT || "http://localhost:8000"

const llm = llmOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-4o-mini",
});

const catalogueTool = mcp(`${gatewayEndpoint}/catalogue`)

const steps = await agent({llm})
    .then({
        prompt: "以下の新商品を登録したいです。名前: Hyper Hoodie、価格: 20000円、商品概要: とにかくすごいパーカー",
        mcps: [catalogueTool], // Automatic tool selection
    })
    .then({
        prompt: "すべての製品情報のサマリーを作成してください",
        mcps: [catalogueTool], // Automatic tool selection
    })
    .run()

steps.forEach(step => {
    console.log(`[Tool call] ${step.toolCalls}`)
    console.log(`[LLM output] ${step.llmOutput}`)
});
