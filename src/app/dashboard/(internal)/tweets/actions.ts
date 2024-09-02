'use server'

import type { SchemaAddTweet } from '@/app/dashboard/(internal)/tweets/schema'
import { dbClient } from '@/db'
import { insertNewTweet, refreshTweets } from '@/utils/tweet'
import { getTweetId, validateTweetUrl } from '@/utils/twitter'
import { revalidatePath } from 'next/cache'
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

  const data = await insertNewTweet({ tweet, topicId: props.topicId })

  revalidatePath('/dashboard/tweets', 'page')

  return {
    ok: true,
    message: '🎉 Tweet added successfully',
  }
}

export const actionGetTweets = async () => {
  const data = await dbClient.query.tweets.findMany({
    with: {
      topic: {
        columns: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
    orderBy(fields, operators) {
      return operators.desc(fields.tweetCreatedAt)
    },
  })

  return data
}

export const actionGetTweetsByTopicId = async (topicId: string) => {
  const data = await dbClient.query.tweets.findMany({
    with: {
      topic: {
        columns: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
    where(fields, operators) {
      return operators.eq(fields.topicId, topicId)
    },
    orderBy(fields, operators) {
      return operators.desc(fields.tweetCreatedAt)
    },
  })

  return data
}

export const actionGetTweetByTweetId = async (id: string) => {
  const data = await dbClient.query.tweets.findFirst({
    where(fields, operators) {
      return operators.eq(fields.tweetId, id)
    },
    with: {
      topic: {
        columns: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  })

  return data
}

export const refreshTweetByTweetId = async (id: string) => {
  const tweet = await dbClient.query.tweets.findFirst({
    where(fields, operators) {
      return operators.eq(fields.tweetId, id)
    },
  })

  if (!tweet) {
    return {
      ok: false,
      message: '❌ Tweet not found',
    }
  }

  const resp = await getTweet(tweet.tweetId)

  if (!resp) {
    return {
      ok: false,
      message: "❌ Couldn't fetch tweet",
    }
  }

  const data = await refreshTweets({ tweet: resp })

  revalidatePath(`/dashboard/tweets/${id}`)
  revalidatePath('/dashboard/tweets', 'page')

  return {
    ok: true,
    message: '🎉 Tweet updated successfully',
  }
}

// export const actionAddTopic = async (props: SchemaAddTopic) => {
//   const data = await dbClient
//     .insert(dbSchema.topics)
//     .values({
//       title: props.title,
//       slug: props.title.toLowerCase().replace(/\s/g, '-'),
//       description: props.description,
//     })
//     .returning()

//   revalidatePath('/dashboard/topics', 'page')

//   return '🎉 Topic added successfully'
// }

// export const actionUpdateTopic = async (id: string, props: SchemaAddTopic) => {
//   const data = await dbClient
//     .update(dbSchema.topics)
//     .set({
//       title: props.title,
//       slug: props.title.toLowerCase().replace(/\s/g, '-'),
//       description: props.description,
//     })
//     .where(eq(dbSchema.topics.id, id))

//   revalidatePath(`/dashboard/topics/${id}`)

//   return '🎉 Topic updated successfully'
// }

// export const actionGetTopics = async () => {
//   const data = await dbClient.select().from(dbSchema.topics)

//   return data
// }

// export const actionGetTopicById = async (id: string) => {
//   const data = await dbClient.select().from(dbSchema.topics).where(eq(dbSchema.topics.id, id)).limit(1)

//   return data[0]
// }
