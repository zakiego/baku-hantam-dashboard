'use server'

import type { SchemaAddTopic } from '@/app/dashboard/(internal)/topics/schema'
import { dbClient, dbSchema } from '@/db'
import { AI_MODEL } from '@/lib/ai'
import { generateText } from 'ai'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const actionAddTopic = async (props: SchemaAddTopic) => {
  const data = await dbClient
    .insert(dbSchema.topics)
    .values({
      title: props.title,
      slug: props.title.toLowerCase().replace(/\s/g, '-'),
      description: props.description,
    })
    .returning()

  revalidatePath('/dashboard/topics', 'page')

  return '🎉 Topic added successfully'
}

export const actionUpdateTopic = async (id: string, props: SchemaAddTopic) => {
  const data = await dbClient
    .update(dbSchema.topics)
    .set({
      title: props.title,
      slug: props.title.toLowerCase().replace(/\s/g, '-'),
      description: props.description,
      updatedAt: new Date(),
      summary: props.summary,
      summary_ai: props.summary_ai,
      ...(props.createdAt && { createdAt: new Date(props.createdAt) }),
    })
    .where(eq(dbSchema.topics.id, id))

  revalidatePath(`/dashboard/topics/${id}`)

  return '🎉 Topic updated successfully'
}

export const actionGetTopics = async () => {
  const data = await dbClient.select().from(dbSchema.topics).orderBy(desc(dbSchema.topics.createdAt))

  return data
}

export const actionGetTopicById = async (id: string) => {
  const data = await dbClient.select().from(dbSchema.topics).where(eq(dbSchema.topics.id, id)).limit(1)

  return data[0]
}

export const actionChangePublicStatus = async (id: string, isPublic: boolean) => {
  const data = await dbClient.update(dbSchema.topics).set({ isPublic }).where(eq(dbSchema.topics.id, id))

  revalidatePath(`/dashboard/topics/${id}`)

  return isPublic ? '🎉 Topic is now public' : '🎉 Topic is now private'
}

export const actionDeleteTopic = async (id: string) => {
  const data = await dbClient.delete(dbSchema.topics).where(eq(dbSchema.topics.id, id))

  revalidatePath(`/dashboard/topics/${id}`)

  return '🎉 Topic deleted successfully'
}

export const actionAIGenerateSummary = async (id: string) => {
  const data = await dbClient.query.topics.findFirst({
    where: eq(dbSchema.topics.id, id),
    with: {
      tweets: {
        columns: {
          tweetText: true,
          tweetUserName: true,
          tweetUserScreenName: true,
          quotedTweetText: true,
          quotedTweetUserName: true,
          quotedTweetUserScreenName: true,
        },
      },
    },
  })

  if (!data) {
    throw new Error('Topic not found')
  }

  const { text } = await generateText({
    model: AI_MODEL,
    prompt: `
    Gue punya beberapa tweet yang ngebahas topik ${data.title}.
    Tolong summarize tweet-tweet ini.
    Ringkas poin-poin penting, gunakan bahasa yang non-formal dan santai, tapi tetap jelas.
    Hindari detail yang nggak penting dan fokus ke inti ceritanya.
    Pisahkan setiap poin penting pake tanda '>'.
    Maksimal 5 poin.
    Jangan lupa pake gaya bahasa Twitter yang simpel dan to the point.
    Maksimal 280 karakter.
    Berikut tweet-tweetnya: ${JSON.stringify(data.tweets)}
    `,
  })

  console.log(text)

  return text
}
