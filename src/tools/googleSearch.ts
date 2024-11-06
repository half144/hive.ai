import chalk from "chalk";
import { Tool } from "../models";
import { getParams, typ } from "../typeUtils";

const GoogleSearchParams = {
  query: typ.string,
};

const GoogleSearchTool = new Tool({
  description:
    "Search in the web using google. returns a list of results, you still need to handle it. for me, return explicity input with a question",
  name: "Google",
  executerParams: getParams(GoogleSearchParams),
  executer: async ({ query }) => {
    console.log(chalk.yellow(`Google - Searching for: ${query}`));

    const apiKey = process.env.SERP_API_KEY || "";

    if (!apiKey) {
      throw new Error("SERP_API_KEY is not set");
    }

    const res = await fetch(
      `https://serpapi.com/search.json?engine=google&q=${query}&api_key=${apiKey}`
    ).then((res) =>
      res.json().then((res) => {
        // only the firsts 5
        return res.organic_results.slice(0, 5);
      })
    );

    return res.map((item: any) => ({
      title: item.title,
      snippet: item.snippet,
      link: item.link,
    }));
  },
});

export { GoogleSearchTool };
