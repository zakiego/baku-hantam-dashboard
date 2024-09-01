import { ApplicationLayout } from '@/app/application-layout'
import { auth } from '@/auth'
import { getEvents } from '@/data'
import '@/styles/tailwind.css'
import { SessionProvider } from 'next-auth/react'
import { redirect } from 'next/navigation'
import type React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    return redirect('/dashboard/login')
  }

  const events = await getEvents()

  return (
    <div
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <div>
        <SessionProvider session={session}>
          <ApplicationLayout events={events}>{children}</ApplicationLayout>
        </SessionProvider>
      </div>
    </div>
  )
}
