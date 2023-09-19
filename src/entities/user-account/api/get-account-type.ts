import axios, { AxiosResponse } from 'axios'

import { API_URL } from '@/src/shared/lib/constants'

import { AccountType } from '../model/types'
export const getAccountType = async (token: string | null | undefined): Promise<AccountType> => {
	if (!token) {
		return 'regular'
	}

	try {
		const { data } = await axios.get<any, AxiosResponse<{ status: AccountType }>>(API_URL + '/auth/account-type', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return data.status
	} catch (err) {
		return 'regular'
	}
}
