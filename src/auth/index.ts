import { dbClient } from '@/db'
import { ENV } from '@/lib/env'
import { verifyPassword } from '@/utils/hash'
import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      username: string
      level: string
      image: string | null
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await dbClient.query.users.findFirst({
          where(fields, operators) {
            return operators.eq(fields.username, credentials.username as string)
          },
          columns: {
            id: true,
            name: true,
            username: true,
            password: true,
            level: true,
            image: true,
          },
        })

        if (!user) {
          throw new Error('User not found')
        }

        const isValid = await verifyPassword(credentials.password as string, user.password)

        if (!isValid) {
          throw new Error('Password is incorrect')
        }

        // omit password from user object
        const { password, ...rest } = user

        return rest
      },
    }),
  ],

  secret: ENV.AUTH_SECRET,
})
