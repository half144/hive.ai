import chalk from "chalk";
import { Task, JobProps, Plan, Tool, Agent } from "./models";
import { IModel } from "./llms/index";
import inform from "./helper/console.ts";

class Hive {
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
    return { results }; 
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

      inform.agent(`Task Objective: ${planAction.objective}`);
      inform.agent(`Assigned Agent: ${agent!.name} - ${agent!.goal}`);
      inform.agent(`Selected Tool: ${planAction.tool} - ${tool?.description}`);

      const prompt = `
        ### Job Context ###
        - **Overall Objective**: Complete the tasks using designated agents and tools.
        - **Previous Tasks**: ${taskResults.map((task) => `${task.task} = ${task.response}`).join("\n")}

        ### Current Action ###
        - **Task Objective**: ${planAction.objective}
        - **Task Description**: ${planAction.task}
        - **Agent Goal**: ${agent!.goal}
        - **Selected Tool**: ${planAction.tool} - ${tool?.description}

        ### Instructions ###
        Leverage the selected tool along with the contextual information and memory to effectively complete the described task. Reference previous memory and results as needed to ensure coherence in your response. 

        ### Expected Response Format ###
        The response will be used as input for the selected tool.
        Please follow the strict response format outlined below:
        ${JSON.stringify(tool?.executerParams)}
      `;

      const response = await this.model.prompt(prompt);

      console.log(chalk.bgCyan(chalk.black(`Response from LLM:`)));
      console.log(chalk.blueBright(JSON.stringify(response)));

      const resultFromTool = await tool!.executer(response);
      agent!.addToolResponse(JSON.stringify(resultFromTool)); 

      console.log(chalk.bgCyan(chalk.black(`Result from ${tool?.name}:`)));
      console.log(chalk.blueBright(JSON.stringify(resultFromTool)));


      const result = {
        task: planAction.task,
        objective: planAction.objective,
        response: resultFromTool,
        expectedOutput: planAction?.expectedOutput,
      };

      const res = await this.generateSummary([result]);

      taskResults.push({task: planAction.objective, response: res});
    }

    // Retornar os resultados das tarefas
    return taskResults;
  }

  private async generateSummary(taskResults: any[]) {
    const summaryLines = taskResults.map((result) => {
      return `** Task: "${result.task}"; \n **Objective: "${result.objective}"; \n **Response: ${JSON.stringify(result.response)}. \n **Expected Output: "${result.expectedOutput}"`;
    });

    // create a prompt wich will return the basic summary about each task
    const summaryPrompt = `
      ### Summary ###
      ${summaryLines.join("\n")}

      ### Summary Prompt ###
      Return a direct and super simple summary of task.
      the response should be like expected output format.
      because its that what user want, the response should respond
      the expected output format.

      ### Output Format ###
      {
        "summary": [
          {
            "response": "conslusion of the task, dont be afraid to be long if you want",
          }
        ]
      }
    `;

    const summary = await this.model.prompt(summaryPrompt);
    summary.summary.forEach((task: any) => {
      inform.agent(task.response)
    });
    return summary.summary[0].response;

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
        Carefully review the list of tasks provided below and formulate a detailed execution plan to accomplish them.

        **Tasks:**
        [${tasks.join(",\n")}]

        For each task, please provide the following details:
        - **Assigned Agent:** Specify the name of the agent responsible for executing the task.
        - **Selected Tool:** Identify the specific tool that the agent will employ to complete the task.
        - **Defined Objective:** Clearly articulate the specific goal of the task.
        - **Anticipated Outcome:** Describe the expected result or output from successfully completing the task.

        **Output Format:**
        
        Your execution plan should be structured in a way that facilitates the agent in achieving their objectives effectively. Feel free to rearrange the tasks as necessary; they do not need to follow the original order. If a task requires information or results from another task, ensure that the plan reflects this dependency appropriately.

        !! YOUR RESPONSE MUST STRICTLY FOLLOW THIS FORMAT !!
        {
          "plan": [
            {
              "task": "Task Description",
              "agent": "Name of the Agent",
              "tool": "Name of the Tool", // *Each plan step should utilize only one tool*
              "objective": "Specific Goal of the Task",
              "expectedOutput": "Description of the Expected Outcome"
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
}

export { Hive };