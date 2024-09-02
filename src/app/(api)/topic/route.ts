export const dynamic = 'force-dynamic'

import { dbClient } from '@/db'

export async function GET() {
  const data = await dbClient.query.topics.findMany({
    where(fields, operators) {
      return operators.eq(fields.isPublic, true)
    },
    with: {
      tweets: {
        columns: {
          id: true,
          tweetUserId: true,
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
    orderBy(fields, operators) {
      return operators.desc(fields.updatedAt)
    },
  })

  const modifiedData = data.map(({ tweets: peoples, updatedAt, createdAt, ...rest }) => {
    const uniquePeoples = peoples.reduce((acc: (typeof data)[number]['tweets'], curr) => {
      if (!acc.find((item) => item.tweetUserId === curr.tweetUserId)) {
        acc.push(curr)
      }
      return acc
    }, [])

    return {
      ...rest,
      tweets_count: peoples.length,
      update_at: updatedAt,
      create_at: createdAt,
      peoples: uniquePeoples,
    }
  })

  return Response.json({ data: modifiedData })
}
