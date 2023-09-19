import axios, { AxiosResponse } from 'axios'
import * as process from 'process'

import { DaDataResponse } from './types'

const url = process.env.NEXT_PUBLIC_URL_DADATA as string

const token = process.env.NEXT_PUBLIC_TOKEN_DADATA
export const getCompanyData = async (prompt: any) => {
	if (!token) {
		return null
	}

	try {
		const { data } = await axios.post<any, AxiosResponse<DaDataResponse>>(url, JSON.stringify({ query: prompt }), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Token ' + token,
			},
		})
		return data
	} catch (err) {
		return null
	}
}
