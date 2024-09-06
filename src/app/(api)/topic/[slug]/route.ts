import { dbClient } from "@/db";
import snakecaseKeys from "snakecase-keys";

interface Params {
  slug: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const data = await dbClient.query.topics.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.isPublic, true),
        operators.eq(fields.slug, context.params.slug),
      );
    },
    with: {
      tweets: {
        columns: {
          id: true,
          tweetUserId: true,
          tweetProfileImageUrl: true,
          tweetData: true,
          tweetCreatedAt: true,
          tweetId: true,
          tweetText: true,
          tweetUserName: true,
          tweetUserScreenName: true,
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
  });

  if (!data) {
    return Response.json(
      { ok: false, message: "Topic not found" },
      { status: 404 },
    );
  }

  return Response.json({ ok: true, data: snakecaseKeys(data || {}) });
}
