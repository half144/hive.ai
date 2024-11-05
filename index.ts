import env from "dotenv";
import { Job } from "./lib/index.ts";
import { LLamaModel } from "./lib/llms.ts";
import { Agent, Task } from "./lib/models.ts";
import { GoogleSearchTool } from "./lib/tools/googleSearch.ts";
import { MathTool } from "./lib/tools/mathTool.ts";

env.config();

const apiKeyGloq = process.env.API_KE_GROQ || "";
const llama = new LLamaModel(apiKeyGloq);

const Jake = new Agent({
  role: "helper",
  name: "Jake",
  backstory:
    "a professional helper, who can search on the web for solve a problem",
  goal: "help the user solve a problem",
  tools: [GoogleSearchTool, MathTool],
});

const BitCoin = new Task({
  description: "Will get the price of bitcoin in the web",
  agent: Jake,
  expectedOutput: "the price of bitcoin",
});

const Ethereum = new Task({
  description: "Will get the price of ethereum in the web",
  agent: Jake,
  expectedOutput: "the price of ethereum",
});

const PriceBitCoinAndEthereum = new Task({
  description: "Make the sum of bitcoin and ethereum price",
  agent: Jake,
  expectedOutput: "the sum of bitcoin and ethereum price",
})

const main = async () => {
  const job = new Job({
    agents: [Jake],
    tasks: [BitCoin],
    model: llama,
  });

  await job.execute();
};

main();
