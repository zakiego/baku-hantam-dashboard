import { z } from "zod";

export const schemaAddTweet = z.object({
  url: z.string().url(),
  topicId: z.string().length(26),
});

export type SchemaAddTweet = z.infer<typeof schemaAddTweet>;
