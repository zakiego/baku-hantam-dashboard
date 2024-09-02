import type React from 'react'
import { Providers } from './providers'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Providers>{children}</Providers>
    </div>
  )
}
