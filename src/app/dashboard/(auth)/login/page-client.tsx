'use client'

import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
  const { push } = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    const resp = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (resp?.error) {
      toast.error('Username or password is incorrect')
      return
    }

    toast.success('Login success')
    push('/dashboard')
  }

  return (
    <>
      <div className="min-h-screen bg-zinc-900">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Baku Hantam</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <Field>
                <Label htmlFor="email">Username</Label>
                <div className="mt-2">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Password
                  </Label>
                </div>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </Field>

              <div>
                <Button onClick={handleSubmit} className="flex w-full justify-center" disabled={!username || !password}>
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
