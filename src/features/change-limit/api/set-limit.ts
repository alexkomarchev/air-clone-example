import axios, { AxiosResponse } from 'axios'

import { ResponseGetPersons } from '@/src/features/invite-person-in-business'
import { API_URL } from '@/src/shared/lib/constants'

export const updateLimit = async (email?: string, limit?: string, token?: string) => {
	try {
		const { data } = await axios.put<{ token_limit: string }, AxiosResponse<ResponseGetPersons>>(
			API_URL + `/auth/business-host/accounts/${email}`,
			{ token_limit: limit },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return data.token_limit
	} catch (err) {
		return null
	}
}
