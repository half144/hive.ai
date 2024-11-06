import { Hive } from ".";
import { IModel } from "./llms/index";

import { Agent } from "./agent/index";

interface Memory {
  reflective: string[]; // Memória reflexiva
  toolResponses: string[]; // Memória de respostas de ferramentas
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
  expectedOutput: string;
  thought: string;
};

type JobProps = {
  agents: Agent[];
  tasks: Task[];
  model: IModel;
};

export { Task, Tool, JobProps, Plan };
