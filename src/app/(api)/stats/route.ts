export const dynamic = "force-dynamic";

import { dbClient } from "@/db";
import snakecaseKeys from "snakecase-keys";

export async function GET() {
  const topics = await dbClient.query.topics.findMany({
    where(fields, operators) {
      return operators.eq(fields.isPublic, true);
    },
    with: {
      tweets: {
        columns: {
          tweetId: true,
          tweetUserId: true,
        },
      },
    },
  });

  const tweets = topics.flatMap((topic) => topic.tweets);

  const usersSet = new Set(tweets.map((tweet) => tweet.tweetUserId));

  return Response.json({
    data: snakecaseKeys({
      users: usersSet.size,
      topics: topics.length,
      tweets: tweets.length,
    }),
  });
}
