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
      return operators.desc(fields.updatedAt)
    },
  })

  const modifiedData = data.map(({ tweets: peoples, updatedAt, createdAt, ...rest }) => {
    const allPeoples: {
      id: string
      user_id: string
      profile_image_url: string
    }[] = []

    // biome-ignore lint/complexity/noForEach: <explanation>
    peoples.forEach((item) => {
      allPeoples.push({
        id: item.id,
        user_id: item.tweetUserId,
        profile_image_url: item.tweetProfileImageUrl,
      })

      if (item.quotedTweetId && item.quotedTweetUserId && item.quotedTweetUserProfileImageUrl) {
        allPeoples.push({
          id: item.quotedTweetId,
          user_id: item.quotedTweetUserId,
          profile_image_url: item.quotedTweetUserProfileImageUrl,
        })
      }
    })

    const uniquePeoples = allPeoples.filter(
      (item, index, self) => self.findIndex((t) => t.user_id === item.user_id) === index
    )

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
