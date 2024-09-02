import { relations } from 'drizzle-orm'
import { boolean, json, pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { ulid } from 'ulidx'

export const tweets = pgTable('tweets', {
  id: varchar('id', { length: 26 }).$defaultFn(ulid).primaryKey(),

  tweetId: text('tweet_id').notNull().unique(),
  tweetCreatedAt: text('tweet_created_at').notNull(),
  tweetText: text('tweet_text').notNull(),
  tweetUserId: text('tweet_user_id_str').notNull(),
  tweetUserName: text('tweet_user_name').notNull(),
  tweetUserScreenName: text('tweet_user_screen_name').notNull(),
  tweetProfileImageUrl: text('tweet_profile_image_url').notNull(),

  quotedTweetUserId: text('quoted_tweet user_id_str'),
  quotedTweetUserName: text('quoted_tweet_user_name'),
  quotedTweetUserScreenName: text('quoted_tweet_user_screen_name'),
  quotedTweetUserProfileImageUrl: text('quoted_tweet_user_profile_image_url'),
  quotedTweetText: text('quoted_tweet_text'),
  quotedTweetCreatedAt: text('quoted_tweet_created_at'),
  quotedTweetId: text('quoted_tweet_id'),

  tweetData: json('tweet_data').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  cachedAt: timestamp('cached_at').notNull().defaultNow(),
  topicId: varchar('topic_id', { length: 26 }),

  isPublic: boolean('is_public').default(true),
})

export const tweetsRelations = relations(tweets, ({ one }) => ({
  topic: one(topics, {
    fields: [tweets.topicId],
    references: [topics.id],
  }),
}))

export const topics = pgTable('topics', {
  id: varchar('id', { length: 26 }).$defaultFn(ulid).primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),

  summary: text('summary'),
  summary_ai: text('summary_ai'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),

  isPublic: boolean('is_public').default(true),
})

export const topicsRelations = relations(topics, ({ many }) => ({
  tweets: many(tweets),
}))

export const userLevels = pgEnum('user_level', ['super', 'admin', 'user'])

export const users = pgTable('user', {
  id: text('id').primaryKey().$defaultFn(ulid).primaryKey(),
  name: text('name').notNull(),
  username: text('username').unique().notNull(),
  image: text('image'),
  level: userLevels('level').notNull().default('user'),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  lastSeen: timestamp('last_seen'),
  isVerified: boolean('is_verified').default(false),
})
