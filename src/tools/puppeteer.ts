import { Tool } from "../models";

const PuppeteerParams = {
    action: "access | click | type | screenshot",
    paramsForAction: {
        ["access?"]: {
            url: "string?",
        },
        ["click?"]: {
            selector: "string?",
        },
        ["type?"]: {
            selector: "string?",
            text: "string?",
        },
        ["screenshot?"]: {
            selector: "string?",
            path: "string?",
        },
    }
}

const puppeteerExecuter = async (params:any) => {
    console.log(params)
    return "DONE"
}

const PuppeteerTool = new Tool({
    name: "Puppeteer",
    description: `A specialized tool for performing a single web browser interaction at a time. 
                  Use this tool for isolated tasks, where each action (e.g., click, navigate, or extract data) 
                  is specified individually and executed step-by-step. 
                  Break down complex workflows into atomic tasks for best results.`,
    executerParams: PuppeteerParams,
    executer: puppeteerExecuter
  });

export  {PuppeteerTool}