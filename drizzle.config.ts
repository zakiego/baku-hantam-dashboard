import { ENV } from '@/lib/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
  strict: true,
})
