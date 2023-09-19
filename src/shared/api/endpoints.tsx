import axios, { AxiosResponse } from 'axios'
import { Session } from 'next-auth'
import * as process from 'process'

import { INeuronModel } from '@/src/pages'
import { API_HOST } from '@/src/shared/lib/constants'
import { IImagesResponse } from '@/src/shared/lib/types/types-dalle'
import { IMessageRequest, IMessageResponse, ISendMessageResponse } from '@/src/shared/lib/types/types-gpt'

const API_URL = process.env.NEXT_PUBLIC_MAIN_URL

type Result = {
	question: string
	link: string
	created_at: string
	resulting_balance?: number
}

export type Wrap = {
	count: number
	next: string | null
	page_size: number
	previous: string | null
}

export type WrapResponse<T> = Wrap & {
	results: T[]
}

export const api = {
	async getImagesSD(token: string | null, url: string): Promise<WrapResponse<Result> | null> {
		try {
			const { data } = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return data
		} catch (err) {
			return null
		}
	},

	async getImagesDalle(token: string | null, url: string): Promise<WrapResponse<IImagesResponse> | null> {
		try {
			const { data } = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			return data
		} catch (err) {
			return null
		}
	},

	async getMessagesChatGPT(token: string | null): Promise<IMessageResponse[] | []> {
		try {
			const { data } = await axios.get<IMessageResponse[]>(API_URL + '/ml_models/chatgpt', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return data
		} catch (err) {
			return []
		}
	},

	async sendMessageChatGPT(token: string | null, message: IMessageRequest): Promise<ISendMessageResponse> {
		try {
			const { data } = await axios.post<IMessageRequest, AxiosResponse<IMessageResponse>>(API_URL + '/ml_models/chatgpt', message, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			return { data, isError: false }
		} catch (err) {
			return { data: null, isError: true, error: err }
		}
	},

	async getFavoritesModel(token: string | null, session: Session | null): Promise<INeuronModel[] | []> {
		try {
			const { data } = await axios.get<INeuronModel[] | []>(API_URL + `/ml_models/${session?.user?.name}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			return data?.filter((model) => model.is_favourite)
		} catch (err) {
			return []
		}
	},

	async getAllModels(token: string | null): Promise<INeuronModel[] | []> {
		try {
			const { data } = await axios.get<INeuronModel[]>(API_URL + '/ml_models/', {
				headers: {
					Authorization: token ? `Bearer ${token}` : '',
				},
			})

			return data
		} catch (err) {
			return []
		}
	},
}
