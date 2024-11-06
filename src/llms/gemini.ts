import { IModel } from ".";

export class GeminiModel implements IModel {
  apiKey: string;

  constructor() {
    const apiKey = process.env.API_KEY_GEMINI || "";

    if (!apiKey) {
      throw new Error("API_KEY not provided for GeminiModel");
    }

    this.apiKey = apiKey;
  }

  async prompt(prompt: string) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4000,
          responseMimeType: "application/json",
        },
      }),
    }).then((response) => response.json());

    return JSON.parse(response.candidates[0].content.parts[0].text);
  }
}
