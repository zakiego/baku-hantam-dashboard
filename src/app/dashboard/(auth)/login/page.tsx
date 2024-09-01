// export default function Page() {
//   return (
//     <form
//       action={async (formData) => {
//         'use server'
//         await signIn('credentials', formData)
//       }}
//     >
//       <label>
//         Password
//         <input name="password" type="password" />
//       </label>
//       <Button type="submit">Sign In</Button>
//     </form>
//   )
// }

import { signIn } from '@/auth'
import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'

export default function Page() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
      <div className="min-h-screen bg-zinc-900">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Manajemen Baku Hantam
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              action={async (formData) => {
                'use server'
                await signIn('credentials', formData)
              }}
              className="space-y-6"
            >
              <Field>
                <Label htmlFor="email">Username</Label>
                <div className="mt-2">
                  <Input id="username" name="username" type="text" required autoComplete="username" />
                </div>
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Password
                  </Label>
                </div>
                <div className="mt-2">
                  <Input id="password" name="password" type="password" required autoComplete="current-password" />
                </div>
              </Field>

              <div>
                <Button type="submit" className="flex w-full justify-center">
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
