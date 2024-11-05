import { Tool } from "../models";
import { getParams, typ } from "../typeUtils";

const DuckDuckGoParams = {
  query: typ.string,
};

const DuckDuckGoTool = new Tool({
  description:
    "Search in the web, util for get external information from a question with a search engine",
  name: "DuckDuckGo",
  executerParams: getParams(DuckDuckGoParams),
  executer: async (question) => {
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${question.query}&format=json`
    );
    const data = await response.json();

    return data;
  },
});

export { DuckDuckGoTool };
