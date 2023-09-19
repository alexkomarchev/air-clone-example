import axios, { AxiosResponse } from 'axios'
import { User } from 'next-auth'

import { API_HOST, API_URL } from '@/src/shared/lib/constants'
import { IPaymentsPlan } from '@/src/shared/lib/types/types-account'
interface IUserBalance {
	current_token_balance: number
}

interface IPayProductRequest {
	uid: string
	is_test: number
}

interface IPayProductResponse {
	payment_url: string
}

interface DataForLogin {
	email: string
	password: string
}

export const accountApi = {
	async getPaymentsPlans(token: string): Promise<IPaymentsPlan[] | null> {
		try {
			const { data } = await axios.get<IPaymentsPlan[]>(API_URL + '/payments/plans', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			return data
		} catch (err) {
			return null
		}
	},

	async payProduct(token: string | null, plan: string): Promise<string | null> {
		if (token === null) {
			return null
		}

		try {
			const { data } = await axios.post<IPayProductRequest, AxiosResponse<IPayProductResponse>>(
				API_HOST + '/payments/plans',
				{
					uid: plan,
					is_test: 1,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return data.payment_url
		} catch (err) {
			return null
		}
	},

	async changePassword(token: string | null, password_1: string, password_2: string, current_password: string): Promise<number> {
		try {
			const { status } = await axios.put(
				API_HOST + '/auth/reset-pass',
				{
					password_1,
					password_2,
					current_password,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			return status
		} catch (err) {
			return 400
		}
	},

	async loginByEmail(email: string, password: string): Promise<User | null> {
		try {
			const { data } = await axios.post<DataForLogin, AxiosResponse<User>>(API_URL + '/auth/login', {
				email,
				password,
			})

			return data
		} catch (err) {
			return null
		}
	},
}
