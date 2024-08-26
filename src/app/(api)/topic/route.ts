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
  })

  const modifiedData = data.map(({ tweets: peoples, ...rest }) => {
    const uniquePeoples = peoples.reduce((acc: (typeof data)[number]['tweets'], curr) => {
      if (!acc.find((item) => item.tweetUserId === curr.tweetUserId)) {
        acc.push(curr)
      }
      return acc
    }, [])

    return {
      ...rest,
      peoples: uniquePeoples,
    }
  })

  return Response.json({ data: modifiedData })
}
