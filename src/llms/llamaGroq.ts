import { IModel } from ".";



export class LLamaModel implements IModel {
    apiKey: string;
  
    constructor(apiKey: string) {
      if(!apiKey) {
        throw new Error("API_KEY not provided for LLamaModel")
      }
  
      this.apiKey = apiKey;
    }
    async prompt(prompt: string) {
      const url = "https://api.groq.com/openai/v1/chat/completions";
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "user",
              content: `[JSON] ${prompt}`,
            },
          ],
          response_format: {
            type: "json_object",
          },
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
        }),
      }).then((response) => response.json());
  
      return JSON.parse(response.choices[0].message?.content);
    }
  }