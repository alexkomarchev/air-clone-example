import { ISODateString } from 'next-auth/core/types'

interface Token {
	access: string
	refresh: string
}

type Account = 'regular' | 'business_host' | 'business_account'

declare module 'next-auth' {
	interface Session {
		user?: {
			name?: string | null
			email?: string | null
			is_superuser: boolean
			account_type: Account
		}
		expires: ISODateString
		access: string
	}

	interface User {
		username: string
		email: string
		is_superuser: boolean
		account_type: Account
		profile_picture_link: string | null
		token: Token
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		username: string
		email: string
		is_superuser: boolean
		access: string
		account_type: Account
	}
}
