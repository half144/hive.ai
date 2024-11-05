import { IModel } from "./llms";

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
  knowledge?: string[] = [];

  constructor(agentProps: AgentProps) {
    this.role = agentProps.role;
    this.goal = agentProps.goal;
    this.tools = agentProps.tools || [];
    this.name = agentProps.name;
    this.backstory = agentProps.backstory;
    this.knowledge = agentProps.knowledge;
  }
}

type TaskProps = {
  description: string;
  agent: Agent;
  expectedOutput: string;
};
class Task {
  description: string;
  agent: Agent;
  expectedOutput: string;

  constructor(taskProps: TaskProps) {
    this.description = taskProps.description;
    this.agent = taskProps.agent;
    this.expectedOutput = taskProps.expectedOutput;
  }
}

type ToolProps = {
  name: string;
  description: string;
  executer: (arg: any) => void | Promise<any>;
  executerParams?: any;
};
class Tool {
  name: string;
  description: string;
  executer: (arg: any) => any | Promise<any>;

  executerParams?: any;

  constructor(toolProps: ToolProps) {
    this.name = toolProps.name;
    this.description = toolProps.description;
    this.executer = toolProps.executer;
    this.executerParams = toolProps.executerParams;
  }
}

type Plan = {
  agent: string;
  tool: string;
  objective: string;
  task: string;
};

type JobProps = {
  agents: Agent[];
  tasks: Task[];
  model: IModel;
};

export { Agent, Task, Tool, JobProps, Plan };
