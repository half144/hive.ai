import { Hive } from "..";
import { IModel } from "../llms";
import { Tool } from "../models";

type AgentProps = {
  name: string;
  role: string;
  goal: string;
  tools?: Tool[];
  backstory: string;
  knowledge?: string[];
};

class Agent {
  name: string;
  role: string;
  goal: string;
  tools: Tool[] = [];
  backstory: string;

  constructor(agentProps: AgentProps) {
    this.role = agentProps.role;
    this.goal = agentProps.goal;
    this.tools = agentProps.tools || [];
    this.name = agentProps.name;
    this.backstory = agentProps.backstory;
  }

  standalone({ prompt, model }: { prompt: string; model: IModel }) {
    return new Hive({
      agents: [this],
      tasks: [
        {
          description: prompt,
          agent: this,
          expectedOutput: "",
        },
      ],
      model,
    });
  }
}

export { Agent };
