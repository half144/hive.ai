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

    await this.executePlan(plan);
  }

  private async executePlan(plan: Plan[]) {
    const memory: string[] = [];

    for (const planAction of plan as Plan[]) {
      console.log("\n");
      console.log(chalk.cyan(`Executing Plan: ${planAction.objective}`));

      const agent = this.agents.find(
        (agent) => agent.name === planAction.agent
      );
      const tool = this.findTool(agent!, planAction.tool);

      const prompt = `
        ### Job Context ###
        - **Overall Objective**: Complete tasks using the designated agents and tools.
        - **Previous Memory**: 
          ${memory.length > 0 ? memory.join("\n") : "No prior interactions"}

        ### Current Action ###
        - **Task Objective**: ${planAction.objective}
        - **Task Description**: ${planAction.task}
        - **Assigned Agent**: ${agent!.name} 
        - **Agent Goal**: ${agent!.goal}
        - **Selected Tool**: ${planAction.tool} - ${tool?.description}

        ### Instructions ###
        Use the designated tool along with the context and memory information to complete the described task. Refer to memory details if needed for coherence. The expected response format is as follows:
        !! SHOULD BE STRICTLY IN THE FOLLOWING FORMAT !!
        ${tool?.executerParams}
      `;

      const response = await this.model.prompt(prompt);

      console.log(chalk.bgCyan(chalk.black(`Response from LLM:`)));
      console.log(chalk.blueBright(JSON.stringify(response)));

      const resultFromTool = await tool!.executer(response);

      console.log(chalk.bgCyan(chalk.black(`Result from ${tool?.name}:`)));
      console.log(chalk.blueBright(JSON.stringify(resultFromTool)));

      if (resultFromTool) {
        memory.push(JSON.stringify(resultFromTool));
      }
    }
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

    const prompt = `
      ### Task Planning ###
      Review the following tasks and create an execution plan.

      Tasks:
      [${tasks.join(",\n")}]

      For each task, specify:
      - Responsible agent (using the agent's name).
      - Tool the agent will use to achieve the objective.
      - Specific objective of the task.

      **Output Format:**
      !! SHOULD BE STRICTLY IN THE FOLLOWING FORMAT !!
      {
        "plan": [
          {
            "task": "Task Description",
            "agent": "Agent Name",
            "tool": "Tool Name",
            "objective": "Specific Objective" // DONT BE AFRAID MAKE IT LARGE IF NECESSARY
          }
        ]
      }
    `;

    const plan = await this.model.prompt(prompt);

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
