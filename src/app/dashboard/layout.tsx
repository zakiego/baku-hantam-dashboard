import '@/styles/tailwind.css'
import type React from 'react'
import { Toaster } from 'sonner'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Toaster richColors />
    </div>
  )
}
