import axios from 'axios'

import { API_URL } from '@/src/shared/lib/constants'

export type InfoBusiness = {
	company_name: string
	company_sector: string
	ITN: number
	PSRN: number
	preferred_name: string
	corporate_email: string
	corporate_phone: string
	worker_amount: string
}
export const getInfo = async (token?: string): Promise<InfoBusiness | null> => {
	try {
		const { data } = await axios.get<InfoBusiness>(API_URL + '/auth/business-host', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return data
	} catch (err) {
		return null
	}
}
