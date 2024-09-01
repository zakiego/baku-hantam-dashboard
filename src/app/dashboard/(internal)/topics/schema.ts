import { z } from 'zod'

export const schemaAddTopic = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(3),
  createdAt: z.string().date().optional(),
})

export type SchemaAddTopic = z.infer<typeof schemaAddTopic>
