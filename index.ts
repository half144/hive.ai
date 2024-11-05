import env from "dotenv";
import { Job } from "./src/index.ts";
import { Agent, Task } from "./src/models.ts";
import { GoogleSearchTool } from "./src/tools/googleSearch.ts";
import { MathTool } from "./src/tools/mathTool.ts";
import { LLamaModel } from "./src/llms/llamaGroq.ts";
import { WeatherTool } from "./src/tools/weather.ts";
import inform from "./src/helper/console.ts";

env.config();

const apiKeyGloq = process.env.API_KE_GROQ || "";
const llama = new LLamaModel(apiKeyGloq);

const Jake = new Agent({
  role: "searcher especialist",
  name: "Jake",
  backstory:
    "I am an expert in search. I can search for information in the web.",
  goal: "search for information in the web for resolving a question",
  tools: [GoogleSearchTool, MathTool, WeatherTool],
});

const DolarPrice = new Task({
  description: "I want to know the dolar price based in USD/BRL",
  agent: Jake,
  expectedOutput: "The price of the dolar today is $ USD/BRL",
});

const main = async () => {
  await Jake.standalone({
    prompt: "What is the price of the dolar today? based in BRL",
    model: llama,
  }).execute()
};

main();
