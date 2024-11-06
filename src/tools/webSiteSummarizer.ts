import chalk from "chalk";
import { Tool } from "../models";
import { getParams, typ } from "../typeUtils";

import puppeteer from "puppeteer";
import { LLamaModel } from "../llms/llamaGroq";

const WebSumarizerParams = {
  url: typ.string,
};

const WebSumarizer = new Tool({
  description: `Useful to scrape and summarize a website content, just pass a string with
    only the full url, no need for a final slash /, eg: https://google.com or https://clearbit.com/about-us`,
  name: "WebSumarizer",
  executerParams: getParams(WebSumarizerParams),
  executer: async ({ url }) => {
    console.log(chalk.yellow(`WebSumarizer - Scrape: ${url}`));
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const text = await page.evaluate(() => {
      const text = document.body.innerText;
      return text;
    });

    console.log({ text });

    const llm = new LLamaModel();

    const prompt = `Format the response: ${text}
        give a detailed summary of the content
        return json
        {
            "formated": "string"
        }
    `;

    const result = await llm.prompt(prompt);

    console.log(result);

    return result.formated;
  },
});

export { WebSumarizer };
