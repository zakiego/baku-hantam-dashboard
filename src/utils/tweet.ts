import { dbClient, dbSchema } from '@/db'
import { eq } from 'drizzle-orm'
import type { Tweet } from 'react-tweet/api'

export const insertNewTweet = async ({ tweet, topicId }: { tweet: Tweet; topicId: string }) => {
  const data = await dbClient
    .insert(dbSchema.tweets)
    .values({
      tweetId: tweet.id_str,
      tweetText: tweet.text,
      tweetCreatedAt: tweet.created_at,

      tweetUserId: tweet.user.id_str,
      tweetUserName: tweet.user.name,
      tweetUserScreenName: tweet.user.screen_name,

      tweetProfileImageUrl: tweet.user.profile_image_url_https,
      tweetData: tweet,

      topicId: topicId,

      ...(tweet.quoted_tweet?.text && {
        quotedTweetUserId: tweet.quoted_tweet.user.id_str,
        quotedTweetUserName: tweet.quoted_tweet.user.name,
        quotedTweetUserScreenName: tweet.quoted_tweet.user.screen_name,
        quotedTweetUserProfileImageUrl: tweet.quoted_tweet.user.profile_image_url_https,
        quotedTweetText: tweet.quoted_tweet.text,
        quotedTweetCreatedAt: tweet.quoted_tweet.created_at,
        quotedTweetId: tweet.quoted_tweet.id_str,
      }),
    })
    .returning()

  return data
}

export const refreshTweets = async ({ tweet }: { tweet: Tweet }) => {
  const data = await dbClient
    .update(dbSchema.tweets)
    .set({
      tweetText: tweet.text,
      tweetCreatedAt: tweet.created_at,

      tweetUserId: tweet.user.id_str,
      tweetUserName: tweet.user.name,
      tweetUserScreenName: tweet.user.screen_name,

      tweetProfileImageUrl: tweet.user.profile_image_url_https,
      tweetData: tweet,

      updatedAt: new Date(),

      ...(tweet.quoted_tweet?.text && {
        quotedTweetUserId: tweet.quoted_tweet.user.id_str,
        quotedTweetUserName: tweet.quoted_tweet.user.name,
        quotedTweetUserScreenName: tweet.quoted_tweet.user.screen_name,
        quotedTweetUserProfileImageUrl: tweet.quoted_tweet.user.profile_image_url_https,
        quotedTweetText: tweet.quoted_tweet.text,
        quotedTweetCreatedAt: tweet.quoted_tweet.created_at,
        quotedTweetId: tweet.quoted_tweet.id_str,
      }),
    })
    .where(eq(dbSchema.tweets.tweetId, tweet.id_str))

  return data
}
