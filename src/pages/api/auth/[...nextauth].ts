import NextAuth, { NextAuthOptions } from 'next-auth'
import { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { accountApi } from '@/src/shared/api/account-endpoints'

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			id: 'credentials',
			type: 'credentials',
			credentials: {},
			async authorize(credentials, req): Promise<User | null> {
				const { username, password } = credentials as any

				const user = await accountApi.loginByEmail(username, password)

				if (user !== null) {
					return user
				}

				return null
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, profile }) {
			if (user) {
				token.access = user.token.access

				token.name = user.username

				token.email = user.email

				token.is_superuser = user.is_superuser

				token.account_type = user.account_type
			}
			return token
		},
		async session({ session, token }) {
			session.access = token.access as string

			if (session.user) {
				session.user.is_superuser = token.is_superuser
				session.user.account_type = token.account_type
			}

			return session
		},
	},
	pages: {
		signIn: '/login',
	},
}

export default NextAuth(authOptions)
