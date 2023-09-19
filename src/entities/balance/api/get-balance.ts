import axios from 'axios'

import { API_URL } from '@/src/shared/lib/constants'

export const getBalance = async (token: string): Promise<number> => {
	try {
		const { data } = await axios.get<{ current_token_balance: number }>(API_URL + '/payments/user-balance', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return data.current_token_balance
	} catch (err) {
		return 0
	}
}
