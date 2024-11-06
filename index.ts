import env from "dotenv";
import { Hive } from "./src/index.ts";
import { Agent, Task, Tool } from "./src/models.ts";
import { LLamaModel } from "./src/llms/llamaGroq.ts";

import { GoogleSearchTool } from "./src/tools/googleSearch.ts";
import { WebSumarizer } from "./src/tools/webSiteSummarizer.ts";

env.config();

const llama = new LLamaModel();

const Rafael = new Agent({
  backstory: "I'm Rafael, I'm an internet user. I want to explore the web.",
  goal: "Use the web, he just want explore",
  name: "Rafael",
  role: "Internet User",
  tools: [GoogleSearchTool, WebSumarizer],
});

const main = async () => {
  const hive = new Hive({
    agents: [Rafael],
    tasks: [
      new Task({
        description:
          "please make a article about AI for me, find stuffs on the internet and summarize it, please, use most than one reference, use 4 references on the web from diferents pages, break it in 4 steps, one for each page",
        agent: Rafael,
        expectedOutput: "a summary of the content",
      }),
    ],
    model: llama,
  });
  await hive.execute();
};

main();
