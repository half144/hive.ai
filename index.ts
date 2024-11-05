import env from "dotenv";
import { Job } from "./lib/index.ts";
import { GeminiModel, LLamaModel } from "./lib/llms.ts";
import { Agent, Task } from "./lib/models.ts";
import { GoogleSearchTool } from "./lib/tools/googleSearch.ts";

env.config();

const apiKeyGloq = process.env.API_KE_GROQ || "";
const apiKeyGemini = process.env.API_KEY_GEMINI || "";

const gemini = new GeminiModel(apiKeyGemini);
const llama = new LLamaModel(apiKeyGloq);

const Jake = new Agent({
  role: "helper",
  name: "Jake",
  backstory:
    "a professional helper, who can search on the web for solve a problem",
  goal: "help the user solve a problem",
  tools: [GoogleSearchTool],
});

const SearchPriceBitCoin = new Task({
  description: "search for the price of bitcoin",
  agent: Jake,
  expectedOutput: "The price of bitcoin",
});

const main = async () => {
  const job = new Job({
    agents: [Jake],
    tasks: [SearchPriceBitCoin],
    model: llama,
  });

  await job.execute();
};

main();
