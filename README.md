# 🚀 HIVE AI – Multi-Agent AI Framework  

<div align="center">

![HIVE AI Logo](https://github.com/user-attachments/assets/2ca20065-0133-4deb-85ee-56be289d2eb0)

</div>

HIVE AI is a library for creating autonomous AI agents that work together to execute complex tasks in a coordinated and efficient manner. Each agent is powered by a **Large Language Model (LLM)** and can use external tools to interact with the environment, making it a powerful solution for intelligent and collaborative automation.  

## 📌 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage Example](#usage-example)
- [Contributing](#contributing)
- [License](#license)

## 🔍 Overview

HIVE AI provides a flexible architecture for developing **autonomous AI agents** that can communicate, plan, and execute tasks using customized tools. The design emphasizes **collective intelligence** and **collaboration**, making it useful for various applications such as web research, interactive assistants, and workflow automation.  

## ✨ Features
- **Autonomous Agents**: Each agent operates independently with a specific goal.  
- **Collaborative Planning**: Multiple agents work together to build and execute action plans.  
- **Customizable Tools**: Agents can use external tools like Google search or web page summarization.  
- **Persistent Memory**: Agents can remember past interactions and improve their performance over time.  
- **Scalability**: Easily scale by adding new agents and tasks as needed.  

## 🛠 Installation

To install *HIVE AI*, use **npm**:  

```bash
npm install hiveai
```

## 🚀 Usage Example  

Here is a simple example of how to create an autonomous agent that searches for information on the web and generates a summarized article from multiple sources:  

```typescript
import env from "dotenv";
import { Hive } from "hiveai";
import { Agent, Task, Tool } from "hiveai/models";
import { LLamaModel } from "hiveai/llms/llamaGroq";

import { GoogleSearchTool } from "hiveai/tools/googleSearch";
import { WebSummarizer } from "hiveai/tools/webSiteSummarizer";

env.config();

const llama = new LLamaModel();

const Rafael = new Agent({
  backstory: "I'm Rafael, an internet user exploring the web.",
  goal: "Search for information online and summarize content.",
  name: "Rafael",
  role: "Internet Researcher",
  tools: [GoogleSearchTool, WebSummarizer],
});

const main = async () => {
  const hive = new Hive({
    agents: [Rafael],
    tasks: [
      new Task({
        description:
          "Find information about AI, summarize it from at least four different sources, and structure it into an article.",
        agent: Rafael,
        expectedOutput: "A well-structured AI summary from multiple sources.",
      }),
    ],
    model: llama,
  });
  await hive.execute();
};

main();
```

## 🤝 Contributing
Contributions are welcome! To contribute, follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature`.
3. Make your changes and commit: `git commit -m 'Adding a new feature'`.
4. Push to the repository: `git push origin my-feature`.
5. Open a Pull Request.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
