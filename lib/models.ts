import { IModel } from "./llms/index";


type AgentProps = {
  name: string;
  role: string;
  goal: string;
  tools?: Tool[];
  backstory: string;
  knowledge?: string[];
};

interface Memory {
  reflective: string[]; // Memória reflexiva
  toolResponses: string[]; // Memória de respostas de ferramentas
}

class Agent {
  name: string;
  role: string;
  goal: string;
  tools: Tool[] = [];
  backstory: string;
  memory: Memory;

  constructor(agentProps: AgentProps) {
    this.role = agentProps.role;
    this.goal = agentProps.goal;
    this.tools = agentProps.tools || [];
    this.name = agentProps.name;
    this.backstory = agentProps.backstory;
    this.memory = {
      reflective: [],
      toolResponses: [],
    };
  }

  // Método para adicionar uma resposta da ferramenta à memória
  addToolResponse(response: string) {
    this.memory.toolResponses.push(response);
  }

  // Método para obter a memória completa do agente
  getMemory() {
    return this.memory;
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
  expectedOutput: string;
};

type JobProps = {
  agents: Agent[];
  tasks: Task[];
  model: IModel;
};

export { Agent, Task, Tool, JobProps, Plan };
