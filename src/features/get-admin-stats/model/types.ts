import { Dayjs } from 'dayjs'

import { IProps } from '@/src/shared/lib/types/entities'

export type IStatsProps = RequestStats & IProps

export type Group = 'DAY' | 'WEEK' | 'MONTH'

export type Product = 'ALL' | 'PLATFORM' | 'CORPORATE' | 'API'
export interface RequestStats {
	start_date?: Dayjs | null
	end_date?: Dayjs | null
	group_by?: Group
	product?: Product
}

export interface ResponseStats {
	time_period: string
	product_type: string
	new_users: number
	new_users_accumulation: number
	dau_accumulation: number
	revenue: number
	payments_quantity: number
	payments_users_quantity: number
	mean_payment_amount: number
	arpu: number
	arppu: number
	tokens_total: number
	tokens_paid_users: number
	tokens_free_users: number
	tokens_gpt_total: number
	tokens_gpt_paid_users: number
	tokens_gpt_free_users: number
	tokens_dalle_total: number
	tokens_dalle_paid_users: number
	tokens_dalle_free_users: number
	tokens_stable_diffusion_total: number
	tokens_stable_diffusion_paid_users: number
	tokens_stable_diffusion_free_users: number
	retention: number
	ltv: number
}
