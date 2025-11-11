import { agent, llmOpenAI } from "volcano-sdk";

const llm = llmOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-4o-mini",
});

const results = await agent({
  llm,
})
  .then({ prompt: "Volcano SDKとはなんですか？" })
  .run();

console.log(`[LLM Output]: ${results[0]?.llmOutput}`);
