export const dynamic = 'force-dynamic'

import { dbClient } from '@/db'

export async function GET() {
  const tweets = await dbClient.query.tweets.findMany({
    where(fields, operators) {
      return operators.eq(fields.isPublic, true)
    },
    columns: {
      tweetId: true,
      tweetUserId: true,
    },
  })

  const usersSet = tweets.map((tweet) => tweet.tweetUserId)

  const topics = await dbClient.query.topics.findMany({
    where(fields, operators) {
      return operators.eq(fields.isPublic, true)
    },
    columns: {
      id: true,
    },
  })

  return Response.json({
    data: {
      users: usersSet.length,
      topics: topics.length,
      tweets: tweets.length,
    },
  })
}
