import { Tool } from "../models";

const MathParams = {
  operation: "add | subtract | multiply | divide | avarage",
  operands: "number[]", 
};

const MathTool = new Tool({
  description:
    "Performs basic mathematical operations: addition, subtraction, multiplication, division and average. for math, use me.",
  name: "MathTool",
  executerParams: MathParams,
  executer: async ({ operation, operands }) => {
    let result;

    switch (operation) {
      case "average":
        result = operands.reduce((acc: any, curr: any) => acc + curr, 0) / operands.length;
        break;
      case "add":
        result = operands.reduce((acc: any, curr: any) => acc + curr, 0);
        break;
      case "subtract":
        result = operands.reduce((acc:any, curr:any) => acc - curr);
        break;
      case "multiply":
        result = operands.reduce((acc: any, curr:any) => acc * curr, 1);
        break;
      case "divide":
        result = operands.reduce((acc:any, curr:any) => acc / curr);
        break;
      default:
        throw new Error("Unsupported operation. Use 'add', 'subtract', 'multiply', or 'divide'.");
    }

    return { result };
  },
});

export { MathTool };
