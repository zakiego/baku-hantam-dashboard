import { ENV } from '@/lib/env'
import argon2 from '@node-rs/argon2'

/**
 * Hashes a password using Argon2
 * @param password - The password to hash
 * @returns The hashed password
 */
export const saltAndHashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await argon2.hash(password)
    return hashedPassword
  } catch (err) {
    throw new Error('Error hashing password')
  }
}

/**
 * Verifies a password against a hashed password
 * @param password - The password to verify
 * @param hashedPassword - The hashed password to verify against
 * @returns Whether the password is valid
 */
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    const isValid = await argon2.verify(hashedPassword, password, {
      salt: Buffer.from(ENV.AUTH_SECRET),
    })
    return isValid
  } catch (err) {
    throw new Error('Error verifying password')
  }
}
