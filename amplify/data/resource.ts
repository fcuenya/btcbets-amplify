import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  UserScore: a.model({
    id: a.id(),
    score: a.integer(),
  })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});