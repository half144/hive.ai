import { Tool } from "../models";


const TalkTool = new Tool({
    description: "This is a tool for interacting with people, you can ask questions and answer them. if you have any questions or need to answer something, you can use this tool.",
    name: "TalkTool",
    executerParams: {
      act: "ask | answer",
      input: "string",
    },
    executer: (question: string) => {
      
    }
  })

  export  {TalkTool}