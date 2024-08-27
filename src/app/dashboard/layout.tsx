import { ApplicationLayout } from '@/app/application-layout'
import { getEvents } from '@/data'
import '@/styles/tailwind.css'
import type React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const events = await getEvents()

  return (
    <div
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <div>
        <ApplicationLayout events={events}>{children}</ApplicationLayout>
      </div>
    </div>
  )
}
