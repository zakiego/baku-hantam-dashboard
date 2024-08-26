import type { SchemaAddTweet } from '@/app/dashboard/tweets/schema'
import { dbClient, dbSchema } from '@/db'
import { OLD_DATA } from '@/db/old-data/data'
import { createSlug } from '@/utils/string'
import { getTweetId, validateTweetUrl } from '@/utils/twitter'
import { eq } from 'drizzle-orm'
import { getTweet } from 'react-tweet/api'

export const actionAddTweet = async (props: SchemaAddTweet) => {
  const url = validateTweetUrl(props.url)
  if (!url) {
    return {
      ok: false,
      message: '❌ Invalid tweet url',
    }
  }

  const tweet = await getTweet(getTweetId(props.url))

  if (!tweet) {
    return {
      ok: false,
      message: "❌ Couldn't fetch tweet",
    }
  }

  const data = await dbClient
    .insert(dbSchema.tweets)
    .values({
      tweetId: tweet.id_str,
      tweetCreatedAt: tweet.created_at,
      tweetText: tweet.text,
      tweetUserId: tweet.user.id_str,
      tweetUserName: tweet.user.name,
      tweetUserScreenName: tweet.user.screen_name,
      topicId: props.topicId,
      tweetData: tweet,
    })
    .onConflictDoNothing()
    .returning()

  return {
    ok: true,
    message: '🎉 Tweet added successfully',
  }
}

const main = async () => {
  console.log('Adding tweets...')

  // await dbClient.delete(dbSchema.tweets)

  // await OLD_DATA.map(async (topic) => {
  //   await dbClient
  //     .insert(dbSchema.topics)
  //     .values({
  //       title: topic.title,
  //       slug: createSlug(topic.title),
  //       description: topic.description,
  //     })
  //     .onConflictDoNothing()

  //   console.log(`Topic ${topic.title} added successfully`)
  // })

  OLD_DATA.map(async (topics) => {
    const slug = createSlug(topics.title)

    const t = await dbClient.select().from(dbSchema.topics).where(eq(dbSchema.topics.slug, slug)).limit(1)

    topics.tweets.map(async (tweet) => {
      const isInserted = await dbClient
        .select()
        .from(dbSchema.tweets)
        .where(eq(dbSchema.tweets.tweetId, getTweetId(tweet)))
        .limit(1)

      if (isInserted.length > 0) {
        console.log(`Tweet ${tweet} already exists 😉`)
        return
      }

      const resp = await actionAddTweet({
        url: tweet.replace('twitter.com', 'x.com'),
        topicId: t[0].id,
      })

      if (resp.ok) {
        console.log(`Tweet ${tweet} added successfully ✅`)
        return
      }

      console.log(`Error adding tweet ${tweet}: ${resp.message}`)
    })
  })
}

main().catch((err) => {
  console.error(`Error adding topics: ${err}`)
})
