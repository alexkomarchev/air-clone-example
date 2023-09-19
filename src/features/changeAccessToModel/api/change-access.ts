import axios, { AxiosResponse } from 'axios'

import { API_URL } from '@/src/shared/lib/constants'

import { AllowedModels } from './types'
export const changeAccess = async (token: string | undefined, value: boolean, title: string): Promise<AllowedModels[] | []> => {
	if (!value) {
		try {
			const { data } = await axios.put<{ models: string }, AxiosResponse<AllowedModels[]>>(
				API_URL + '/auth/business-host/allowed-models',
				{
					models: [title],
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return data
		} catch (err) {
			return []
		}
	}

	if (value) {
		try {
			const { data } = await axios.delete<{ models: string }, AxiosResponse<AllowedModels[]>>(
				API_URL + '/auth/business-host/allowed-models',
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					data: {
						models: [title],
					},
				}
			)
			return data
		} catch (err) {
			return []
		}
	}

	return []
}
