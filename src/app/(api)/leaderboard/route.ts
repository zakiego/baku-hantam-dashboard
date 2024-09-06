export const dynamic = "force-dynamic";

import { dbClient } from "@/db";
import snakecaseKeys from "snakecase-keys";

export async function GET() {
  const data = await dbClient.query.topics.findMany({
    where(fields, operators) {
      return operators.eq(fields.isPublic, true);
    },
    with: {
      tweets: {
        columns: {
          tweetId: true,
          tweetUserId: true,
          tweetProfileImageUrl: true,
          tweetUserName: true,
          tweetUserScreenName: true,
        },
      },
    },
  });

  const tweets = data.flatMap((topic) => topic.tweets);

  const tweetCounts = Object.values(
    tweets.reduce(
      (
        acc: Record<
          string,
          {
            count: number;
            tweetUserId: string;
            tweetProfileImageUrl: string;
            tweetUserName: string;
            tweetUserScreenName: string;
          }
        >,
        tweet,
      ) => {
        if (!acc[tweet.tweetUserId]) {
          acc[tweet.tweetUserId] = {
            count: 0,
            tweetUserId: tweet.tweetUserId,
            tweetProfileImageUrl: tweet.tweetProfileImageUrl,
            tweetUserName: tweet.tweetUserName,
            tweetUserScreenName: tweet.tweetUserScreenName,
          };
        }
        acc[tweet.tweetUserId].count++;
        return acc;
      },
      {},
    ),
  );

  // Sort by count (desc) and then by tweetUserScreenName (asc)
  const sorted = tweetCounts.sort(
    (a, b) =>
      b.count - a.count ||
      a.tweetUserScreenName.localeCompare(b.tweetUserScreenName),
  );

  // Add rank
  const ranked = sorted.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  return Response.json({ data: snakecaseKeys(ranked) });
}
