import env from "dotenv";
import { Hive } from "./src/index.ts";
import { Agent, Task, Tool } from "./src/models.ts";
import { LLamaModel } from "./src/llms/llamaGroq.ts";

import { GoogleSearchTool } from "./src/tools/googleSearch.ts"


env.config();

const apiKeyGloq = process.env.API_KE_GROQ || "";
const llama = new LLamaModel(apiKeyGloq);

const Rafael = new Agent({
  backstory: "I'm Rafael, I'm an internet user. I want to explore the web.",
  goal: "Use the web, he just want explore",
  name: "Rafael",
  role: "Internet User",
  tools: [GoogleSearchTool],
})

const main = async () => {
  await Rafael.standalone({prompt: "Qual vai ser o proximo jogo do brasileirao?", model: llama}).execute();
};

main();
