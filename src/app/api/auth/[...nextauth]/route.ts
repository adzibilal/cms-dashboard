import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { AuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

interface Credentials {
    username: string
    password: string
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'jsmith'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials) return null
                    const { username, password } = credentials

                    // Query the User table using Prisma Client
                    const user = await prisma.user.findUnique({
                        where: {
                            username: username
                        }
                    })

                    if (!user) {
                        return null // User not found
                    }

                    // Compare password using your preferred method
                    const isPasswordValid = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if (!isPasswordValid) {
                        return null // Invalid password
                    }

                    // Successful authentication
                    return user
                } catch (error) {
                    console.error(error)
                    return null // Authentication failed
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma)
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
