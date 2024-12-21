import { defineFunction, secret } from "@aws-amplify/backend";
 
export const fourOMini = defineFunction({
  name: "fourOMini",
  entry: "./handler.ts",
  environment: {
    API_KEY: secret('OPENAI_API_KEY') // ✅ Correct usage
  }
});
