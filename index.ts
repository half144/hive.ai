import env from "dotenv";
import { Job } from "./lib/index.ts";
import { Agent, Task } from "./lib/models.ts";
import { GoogleSearchTool } from "./lib/tools/googleSearch.ts";
import { MathTool } from "./lib/tools/mathTool.ts";
import { LLamaModel } from "./lib/llms/llamaGroq.ts";

env.config();

const apiKeyGloq = process.env.API_KE_GROQ || "";
const llama = new LLamaModel(apiKeyGloq);

const Jake = new Agent({
  role: "searcher especialist",
  name: "Jake",
  backstory:
    "I am an expert in search. I can search for information in the web.",
  goal: "search for information in the web for resolving a question",
  tools: [GoogleSearchTool],
});

const Rio = new Task({
  description: "Get the current Weather in sao paulo in celcius",
  agent: Jake,
  expectedOutput: "weather in sao paulo right now in celcius, like = 30C",
})

const main = async () => {
  const job = new Job({
    agents: [Jake],
    tasks: [Rio],
    model: llama,
  });

  await job.execute();
};

main();
