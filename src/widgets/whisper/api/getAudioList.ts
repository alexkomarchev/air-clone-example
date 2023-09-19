import axios, { AxiosResponse } from 'axios'

import { API_URL } from '@/src/shared/lib/constants'

import { WhisperResponse } from '../ui/whisper/whisper'

export const getAudioList = async (token: string) => {
	try {
		const { data } = await axios.get<WhisperResponse[]>(API_URL + '/ml_models/whisper', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return data
	} catch (err) {
		return []
	}
}
