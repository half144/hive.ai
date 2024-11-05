import env from "dotenv";
import { Job } from "./lib/index.ts";
import { LLamaModel } from "./lib/llms.ts";
import { Agent, Task } from "./lib/models.ts";
import { GoogleSearchTool } from "./lib/tools/googleSearch.ts";

env.config();

const apiKeyGloq = process.env.API_KE_GROQ || "";
const llama = new LLamaModel(apiKeyGloq);

const Jake = new Agent({
  role: "helper",
  name: "Jake",
  backstory:
    "a professional helper, who can search on the web for solve a problem",
  goal: "help the user solve a problem",
  tools: [GoogleSearchTool],
});

const NewYork = new Task({
  description: "weather in New York",
  agent: Jake,
  expectedOutput: "the weather in New York",
});

const BitCoin = new Task({
  description: "bitcoin price",
  agent: Jake,
  expectedOutput: "the price of bitcoin",
});

const Ethereum = new Task({
  description: "ethereum price",
  agent: Jake,
  expectedOutput: "the price of ethereum",
});

const main = async () => {
  const job = new Job({
    agents: [Jake],
    tasks: [BitCoin],
    model: llama,
  });

  await job.execute();
};

main();
