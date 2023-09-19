import axios from 'axios'

import { AllowedModels } from '@/src/features/changeAccessToModel'
import { API_URL } from '@/src/shared/lib/constants'
export const getModels = async (token?: string): Promise<AllowedModels[] | []> => {
	try {
		const { data } = await axios.get<AllowedModels[]>(API_URL + '/auth/business-host/allowed-models', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return data
	} catch (err) {
		return []
	}
}
