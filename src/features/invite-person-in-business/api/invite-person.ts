import axios, { AxiosResponse } from 'axios'

import { API_URL } from '@/src/shared/lib/constants'

import { InviteRoles, inviteRoles } from '../lib/constants'
import { ResponseGetPersons } from '../model/types'
export const invitePerson = async (role: InviteRoles, limit: string, email: string, token?: string): Promise<ResponseGetPersons | null> => {
	try {
		const { data } = await axios.post<{ email: string; token_limit: string }, AxiosResponse<ResponseGetPersons>>(
			API_URL + '/auth/business-host',
			{
				email,
				account_privileges: Object.entries(inviteRoles).find(([key, value]) => value === role)![0],
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
