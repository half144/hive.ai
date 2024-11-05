import env from "dotenv";
import { Hive } from "./src/index.ts";
import { Agent, Task } from "./src/models.ts";
import { GoogleSearchTool } from "./src/tools/googleSearch.ts";
import { MathTool } from "./src/tools/mathTool.ts";
import { LLamaModel } from "./src/llms/llamaGroq.ts";
import { WeatherTool } from "./src/tools/weather.ts";

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

const main = async () => {
  const job = new Hive(
    {
      agents: [Jake],
      tasks: [
        new Task({
          description: "Get the current price bitcoin in BRL",
          agent: Jake,
          expectedOutput: "the bitcoin price in BRL",
        }),
      ],
      model: llama,
    }
  );
  const results = await job.execute();
};

main();
