import env from "dotenv";
import { Hive } from "./src/index.ts";
import { Task, Tool } from "./src/models.ts";
import { LLamaModel } from "./src/llms/llamaGroq.ts";

import { OLLamaModel } from "./src/llms/ollama.ts";

import { GeminiModel } from "./src/llms/gemini.ts";

import { GoogleSearchTool } from "./src/tools/googleSearch.ts";
import { WebSumarizer } from "./src/tools/webSiteSummarizer.ts";
import { WeatherTool } from "./src/tools/weather.ts";

import { TalkTool } from "./src/tools/talkTool.ts";

import { Agent } from "./src/agent/index.ts";

import { Cognitive } from "./src/agent/cognitive.ts";

env.config();

const llama = new OLLamaModel("llama3.1");
const llamaGroq = new LLamaModel();
const gemini = new GeminiModel();

const Rafael = new Agent({
  backstory: "I'm Rafael, I'm an internet user. I want to explore the web.",
  goal: "Use the web, he just want explore",
  name: "Rafael",
  role: "Internet User",
  tools: [WeatherTool],
});

const cognitiveTest = async () => {
  const cognitive = new Cognitive(llama, Rafael);

  const thought = await cognitive.preThought({
    context: "I see you in the street, I'm Marcos. we are good friends. i say: hello how you doing?",
    prompt: "hello how you doing?",
  })

  const result = await cognitive.thought({
    context: "I see you in the street, I'm Carlos. we are good friends. i say: hello how you doing?",
    toThought: thought
  });
}

const hiveTest = async () => {
  const WeatherInNewYork = new Task({
    description: "Get the current weather in New York, in celcius",
    agent: Rafael,
    expectedOutput: "The weather in New York in celsius",
  })

  const hive = new Hive({
    agents: [Rafael],
    tasks: [WeatherInNewYork],
    model: llama,
  });

  await hive.execute();
}

const main = async () => {
  await hiveTest()
};

main();
