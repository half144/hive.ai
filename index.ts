import env from "dotenv";
import { Hive } from "./src/index.ts";
import { Task, Tool } from "./src/models.ts";
import { LLamaModel } from "./src/llms/llamaGroq.ts";

import { GoogleSearchTool } from "./src/tools/googleSearch.ts";
import { WebSumarizer } from "./src/tools/webSiteSummarizer.ts";
import { WeatherTool } from "./src/tools/weather.ts";

import { Agent } from "./src/agent/index.ts";

import { Cognitive } from "./src/agent/cognitive.ts";

env.config();

const llama = new LLamaModel();

const TalkingTool = new Tool({
  description: "This is a tool for interacting with people, you can ask questions and answer them.",
  name: "TalkingTool",
  executerParams: {
    act: "ask | answer",
    input: "string",
  },
  executer: (question: string) => {
    console.log({question});
  }
})

const Rafael = new Agent({
  backstory: "I'm Rafael, I'm an internet user. I want to explore the web.",
  goal: "Use the web, he just want explore",
  name: "Rafael",
  role: "Internet User",
  tools: [WeatherTool, GoogleSearchTool, TalkingTool],
});

const main = async () => {
  const cognitive = new Cognitive(llama, Rafael);

  const thought = await cognitive.thought({
    context: "I see you in the street, I'm Marcos. i say, hello how you doing?",
    toThought: "about the situation, what i need to do?",
  })

};

main();
