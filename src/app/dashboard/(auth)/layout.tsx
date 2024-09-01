import { auth } from '@/auth'
import '@/styles/tailwind.css'
import { redirect } from 'next/navigation'
import type React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session) {
    return redirect('/dashboard')
  }

  return <div>{children}</div>
}
