import chalk from "chalk";
import { Task, JobProps, Plan, Tool, Agent } from "./models";
import { IModel } from "./llms";

class Job {
  agents: Agent[];
  tasks: Task[];
  model: IModel;

  constructor(jobProps: JobProps) {
    this.agents = jobProps.agents;
    this.tasks = jobProps.tasks;
    this.model = jobProps.model;
  }

  async execute() {
    const { plan } = await this.buildPlan();
    const results = await this.executePlan(plan);
    const summary = await this.generateSummary(results); // Gera o resumo final baseado nos resultados
    return { results, summary }; // Retorna tanto os resultados quanto o resumo
  }

  private async executePlan(plan: Plan[]) {
    const taskResults = []; // Armazena os resultados de cada tarefa

    for (const planAction of plan as Plan[]) {
      console.log("\n");
      console.log(chalk.cyan(`Executing Plan: ${planAction.objective}`));

      const agent = this.agents.find(
        (agent) => agent.name === planAction.agent
      );
      const tool = this.findTool(agent!, planAction.tool);

      const prompt = `
        ### Job Context ###
        - **Overall Objective**: Complete the tasks using designated agents and tools.
        - **Previous Memory**: 
          ${agent!.memory.reflective.length > 0 ? agent!.memory.reflective.join("\n") : "No prior reflections recorded."}
        - **Previous Tasks**: ${JSON.stringify(taskResults)}

        ### Current Action ###
        - **Task Objective**: ${planAction.objective}
        - **Task Description**: ${planAction.task}
        - **Assigned Agent**: ${agent!.name} 
        - **Agent Goal**: ${agent!.goal}
        - **Selected Tool**: ${planAction.tool} - ${tool?.description}

        ### Instructions ###
        Leverage the selected tool along with the contextual information and memory to effectively complete the described task. Reference previous memory and results as needed to ensure coherence in your response. 

        ### Expected Response Format ###
        Please follow the strict response format outlined below:
        ${tool?.executerParams}
      `;

      const response = await this.model.prompt(prompt);

      console.log(chalk.bgCyan(chalk.black(`Response from LLM:`)));
      console.log(chalk.blueBright(JSON.stringify(response)));

      const resultFromTool = await tool!.executer(response);
      agent!.addToolResponse(JSON.stringify(resultFromTool)); // Adiciona a resposta da ferramenta à memória do agente

      console.log(chalk.bgCyan(chalk.black(`Result from ${tool?.name}:`)));
      console.log(chalk.blueBright(JSON.stringify(resultFromTool)));

      // Adiciona reflexão à memória do agente
      const reflection = `Executed task: ${planAction.objective} using tool: ${tool?.name}.`;
      agent!.addReflection(reflection);

      // Armazena o resultado da tarefa
      taskResults.push({
        task: planAction.task,
        agent: agent!.name,
        tool: tool?.name,
        objective: planAction.objective,
        response: resultFromTool,
        reflection: reflection,
      });
    }

    // Retornar os resultados das tarefas
    return taskResults;
  }

  private async generateSummary(taskResults: any[]) {
    const summaryLines = taskResults.map((result) => {
      return `- Task: "${result.task}" - objective: "${result.objective}" - Response: ${JSON.stringify(result.response)}.`;
    });

    // create a prompt wich will return the basic summary about each task
    const summaryPrompt = `
      ### Summary ###
      ${summaryLines.join("\n")}

      ### Summary Prompt ###
      Return a direct and super simple summary of each task.

      ### Output Format ###
      {
        "summary": [
          {
            "task": "Task Description",
            "agent": "Agent Name",
            "response": "Response from the Agent",
          }
        ]
      }
    `;

    const summary = await this.model.prompt(summaryPrompt);
    summary.summary.forEach((task: any) => {
      console.log(task.response)
    });
    return summary;

  }

  private async buildPlan() {
    const tasks = this.tasks.map(
      (task) => `
        {
          "Task Description": "${task.description}",
          "Agent": "${task.agent.name}",
          "Agent Goal": "${task.agent.goal}",
          "Available Tools": ${task.agent.tools
            .map(
              ({ name, description }) => `{
            "Name": "${name}",
            "Description": "${description}"
          }`
            )
            .join(",\n")},
          "Agent Background": "${task.agent.backstory}",
          "Expected Output": "${task.expectedOutput}"
        }
      `
    );

    console.log(chalk.black(chalk.bgGreenBright(`Tasks:`)));
    tasks.forEach((task) => console.log(chalk.greenBright(task)));

    const planningPrompt = `
      ### Task Planning ###
      Review the following tasks and devise a comprehensive execution plan.

      Tasks:
      [${tasks.join(",\n")}]

      For each task, please specify:
      - Responsible agent (by name).
      - Tool the agent will utilize to achieve the objective.
      - Clear and specific objective of the task.

      **Output Format:**
      !! RESPONSE MUST FOLLOW THIS STRICT FORMAT !!
      {
        "plan": [
          {
            "task": "Task Description",
            "agent": "Agent Name",
            "tool": "Tool Name",
            "objective": "Specific Objective" // Feel free to elaborate as needed
          }
        ]
      }
    `;

    const plan = await this.model.prompt(planningPrompt);

    console.log("\n");
    console.log(chalk.black(chalk.bgGreenBright(`Plan:`)));
    for (const [index, planAction] of (plan as any).plan.entries()) {
      console.log(
        chalk.green(
          `${index + 1}: ${planAction.agent} - ${planAction.tool} - ${
            planAction.objective
          }`
        )
      );
    }

    return plan as unknown as any;
  }

  findTool(agent: Agent, toolName: string) {
    return agent.tools.find((tool) => tool.name === toolName);
  }

  useTool(tool: Tool, response: string) {
    tool.executer(response);
  }
}

export { Job };