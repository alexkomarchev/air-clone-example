import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'

export const getAccessToken = async (req: NextApiRequest) => {
	const session = await getSession({ req })

	return session?.access
}
