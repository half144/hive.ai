import { IModel } from ".";

export class OLLamaModel implements IModel {
  model: string;

  constructor(model: string) {
    if (!model) {
      throw new Error("Model not provided for LLamaModel");
    }

    this.model = model;
  }
  async prompt(prompt: string) {
    const url = "http://127.0.0.1:11434/api/generate";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        prompt: prompt,
        format: "json",
        stream: false,
        options: {
          temperature: 0,
          top_p: 1,
          max_tokens: 1024,
          topK: 40,
        },
      }),
    }).then((response) => response.json());

    return JSON.parse(response.response);
  }
}
