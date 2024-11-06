import { Agent } from ".";
import { IModel } from "../llms";





 class Cognitive {
    private shortMemory: any[] = [];
    private longMemory: any[] = [];

    private llm: IModel

    private agent: Agent

    private actions = []

    constructor(
        llm: IModel,
        agent: Agent
    ) {
        this.llm = llm
        this.agent = agent
    }

    async thought(context: string, toThought: string) {
        const prompt = `
            ## Who i am?
            - Name: ${this.agent.name}
            - Role: ${this.agent.role}
            - Goal: ${this.agent.goal}

            ## How is my memory?
            - Short Memory: ${JSON.stringify(this.shortMemory)}
            - Long Memory: ${JSON.stringify(this.longMemory)}

            ## What is the current situation?
            - Context: ${context}

            ## What i need to though?
            - ${toThought}

            ** you will respond with a thought. in a json format**

            ### Output Format ###
            {
                "thought": "your thought here",
                "action": "your action", // optional, only if you want to use it. if not, put 'none'
            }
        `

        const response = await this.llm.prompt(prompt)

        this.shortMemory.push(response)

        this.longMemory.push(context)

        if (response.action != 'none') {
            console.log(response.action)
        }

        return response
    }
}

export { Cognitive }