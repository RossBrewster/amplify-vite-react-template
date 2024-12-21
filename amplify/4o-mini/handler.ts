// amplify/4o-mini/handler.ts
import type { Schema } from "../data/resource";
import { env } from "$amplify/env/fourOMini";
import OpenAI from "openai";

// Custom error type for external API errors (like OpenAI or Axios-style errors)
type APIError = Error & {
  response?: {
    status?: number;
    data?: unknown;
  };
};

// Use the generated handler type for "fourOMini"
export const handler: Schema["fourOMini"]["functionHandler"] = async (event) => {
  try {
    console.log("OPENAI_API_KEY:", env.API_KEY);

    const openai = new OpenAI({ apiKey: env.API_KEY });
    const { prompt } = event.arguments;

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    // Return the completion text directly, as a string
    return completion.choices[0].message.content;
  } catch (error: unknown) {
    console.error("Error:", error);
    const typedError = error as APIError;
    // Throw an error so that GraphQL's error handling can return a GraphQL error to the client
    throw new Error(typedError.message || "Unknown error");
  }
};
