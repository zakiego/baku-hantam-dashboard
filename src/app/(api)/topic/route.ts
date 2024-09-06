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
          id: true,
          tweetUserId: true,
          tweetProfileImageUrl: true,
          quotedTweetId: true,
          quotedTweetUserId: true,
          quotedTweetUserProfileImageUrl: true,
        },
      },
    },
    columns: {
      id: true,
      title: true,
      description: true,
      slug: true,
      updatedAt: true,
      createdAt: true,
    },
    orderBy(fields, operators) {
      return operators.desc(fields.updatedAt);
    },
  });

  const modifiedData = data.map(
    ({ tweets: peoples, updatedAt, createdAt, ...rest }) => {
      const allPeoples: {
        id: string;
        userId: string;
        profileImageUrl: string;
      }[] = [];

      // biome-ignore lint/complexity/noForEach: <explanation>
      peoples.forEach((item) => {
        allPeoples.push({
          id: item.id,
          userId: item.tweetUserId,
          profileImageUrl: item.tweetProfileImageUrl,
        });

        if (
          item.quotedTweetId &&
          item.quotedTweetUserId &&
          item.quotedTweetUserProfileImageUrl
        ) {
          allPeoples.push({
            id: item.quotedTweetId,
            userId: item.quotedTweetUserId,
            profileImageUrl: item.quotedTweetUserProfileImageUrl,
          });
        }
      });

      const uniquePeoples = allPeoples.filter(
        (item, index, self) =>
          self.findIndex((t) => t.userId === item.userId) === index,
      );

      return {
        ...rest,
        tweetsCount: peoples.length,
        peoples: uniquePeoples,
      };
    },
  );

  return Response.json({
    ok: true,
    data: snakecaseKeys(modifiedData),
  });
}
