import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { fourOMini } from "../4o-mini/resource"; // import the function

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  // 👇 Add the fourOMini custom query
  fourOMini: a
    .query()
    .arguments({
      prompt: a.string(), // The required argument for your function
    })
    .returns(a.string()) // We expect a string result
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(fourOMini)) // Attach the function as a handler for this query
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
