import '@/styles/tailwind.css'
import type React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
