import axios from 'axios'

import { ResponseGetPersons } from '@/src/features/invite-person-in-business'
import { API_URL } from '@/src/shared/lib/constants'

export const getPersons = async (token?: string): Promise<ResponseGetPersons[] | null> => {
	try {
		const { data } = await axios.get<ResponseGetPersons[]>(API_URL + '/auth/business-host/accounts', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return data
	} catch (err) {
		return null
	}
}
