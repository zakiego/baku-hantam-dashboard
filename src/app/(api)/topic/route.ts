import { dbClient } from '@/db'

export async function GET(request: Request) {
  const data = await dbClient.query.topics.findMany({
    where(fields, operators) {
      return operators.eq(fields.isPublic, true)
    },
    with: {
      tweets: {
        columns: {
          id: true,
          tweetId: true,
          tweetProfileImageUrl: true,
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
  })

  return Response.json({ data })
}
