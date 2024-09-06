export const dynamic = "force-dynamic";

import { dbClient } from "@/db";
import snakecaseKeys from "snakecase-keys";

export async function GET() {
  const tweets = await dbClient.query.tweets.findMany({
    where(fields, operators) {
      return operators.eq(fields.isPublic, true);
    },
    columns: {
      tweetId: true,
      tweetUserId: true,
    },
  });

  const usersSet = new Set(tweets.map((tweet) => tweet.tweetUserId));

  const topics = await dbClient.query.topics.findMany({
    where(fields, operators) {
      return operators.eq(fields.isPublic, true);
    },
    columns: {
      id: true,
    },
  });

  return Response.json({
    data: snakecaseKeys({
      users: usersSet.size,
      topics: topics.length,
      tweets: tweets.length,
    }),
  });
}
