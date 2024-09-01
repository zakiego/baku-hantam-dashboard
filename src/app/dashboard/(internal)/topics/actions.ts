'use server'

import type { SchemaAddTopic } from '@/app/dashboard/(internal)/topics/schema'
import { dbClient, dbSchema } from '@/db'
import { eq } from 'drizzle-orm'
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
      ...(props.createdAt && { createdAt: new Date(props.createdAt) }),
    })
    .where(eq(dbSchema.topics.id, id))

  revalidatePath(`/dashboard/topics/${id}`)

  return '🎉 Topic updated successfully'
}

export const actionGetTopics = async () => {
  const data = await dbClient.select().from(dbSchema.topics).orderBy(dbSchema.topics.title)

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
