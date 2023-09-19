import axios, { AxiosResponse } from 'axios'

import { ResponseGetPersons } from '@/src/features/invite-person-in-business'
import { API_URL } from '@/src/shared/lib/constants'

export const removePerson = async (email: string, token?: string): Promise<ResponseGetPersons | null> => {
	if (!token) {
		return null
	}

	try {
		const { data } = await axios.put<{ status: 'cancelled' }, AxiosResponse<ResponseGetPersons>>(
			API_URL + `/auth/business-host/accounts/${email}`,
			{
				status: 'cancelled',
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return data
	} catch (err) {
		return null
	}
}
