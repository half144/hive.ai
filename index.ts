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

const main = async () => {
  const job = new Job(
    {
      agents: [Jake],
      tasks: [
        new Task({
          description: "Get the weather for New York City",
          agent: Jake,
          expectedOutput: "the weather in celsius",
        }),
        new Task({
          description: "Get the weather for London",
          agent: Jake,
          expectedOutput: "the weather in celsius",
        }),
        new Task({
          description: "Get the weather for Paris",
          agent: Jake,
          expectedOutput: "the weather in celsius",
        }),
        new Task({
          description: "Return a media for me the climate media of the 3 cities using the math tool",
          agent: Jake,
          expectedOutput: "the media of paris, london and new york",
        }),
      ],
      model: llama,
    }
  );
  const results = await job.execute();
};

main();
