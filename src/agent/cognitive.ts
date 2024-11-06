import { Agent } from ".";
import { IModel } from "../llms";

class Cognitive {
  private shortMemory: any[] = [];
  private longMemory: any[] = [];

  private llm: IModel;

  private agent: Agent;

  private actions = [];

  constructor(llm: IModel, agent: Agent) {
    this.llm = llm;
    this.agent = agent;
  }

  private getMySelf() {
    const prompt = `
        ## Who i am?
        - Name: ${this.agent.name}
        - Role: ${this.agent.role}
        - Goal: ${this.agent.goal}

        ## How is my memory?
        - Short Memory: ${JSON.stringify(this.shortMemory)}
        - Long Memory: ${JSON.stringify(this.longMemory)}
    `

    return prompt
  }

  async thought({
    context,
    toThought,
  }: {
    context: string;
    toThought: string;
  }) {
    const prompt = `
            ${this.getMySelf()}

            ## What is the current situation?
            - Context: ${context}

            ## What i need to though?
            - ${toThought}

            ** you will respond with a thought. in a json format**
            ### Output Format ###
            {
                "thought": "your thought here",
                "observation": "your observation here",
                "action": "your action", // optional, only if you want to use it. if not, put 'none'
            }
        `;

    const response = await this.llm.prompt(prompt);

    this.shortMemory.push(response);

    this.longMemory.push(context);

    console.log(response);

    if (response.action != "none") {
      const prompt = `
        ${this.getMySelf()}

        ## What is the current situation?
        - Context: ${context}

        ## My tools
        - ${JSON.stringify(this.agent.tools)}

        ## What i need to ACT, what is my action?
        - ${response.action}

        ### Output Format ###
        {
            "thought": "your thought here",
            "observation": "your observation here",
            "currentAction": "current action",
            "tool": "tool name",
            "toolParams": "tool params"
        }
      `

      const res = await this.llm.prompt(prompt);

      console.log(res);

      if(this.shortMemory.length > 4) {
        this.shortMemory.shift();
      }
    }

    return response;
  }

  async act() {

  }
}

export { Cognitive };
