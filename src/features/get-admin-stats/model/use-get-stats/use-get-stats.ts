import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { Dayjs } from 'dayjs'

import { RequestStats, ResponseStats } from '@/src/features/get-admin-stats'
import { API_URL } from '@/src/shared/lib/constants'

async function getStats(
	token: string | null,
	start_date?: Dayjs | null,
	end_date?: Dayjs | null,
	group_by?: string,
	product?: string
): Promise<ResponseStats[] | []> {
	const formatStartDate = start_date?.format('YYYY-MM-DD')
	const formatEndDate = end_date?.format('YYYY-MM-DD')

	let queryParams = '?'

	const args = [{ start_date: formatStartDate }, { end_date: formatEndDate }, { group_by: group_by }, { product: product }]

	args.forEach((el) => {
		if (Object.values(el)[0]) {
			queryParams += `&${Object.keys(el)[0]}=${Object.values(el)[0]}`
		}
	})

	try {
		const { data } = await axios.get<RequestStats, AxiosResponse<ResponseStats[]>>(API_URL + '/admin/stats' + queryParams, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return data
	} catch (err) {
		return []
	}
}

export const useGetStats = (
	token: string | null,
	start_date?: Dayjs | null,
	end_date?: Dayjs | null,
	group_by?: string,
	product?: string
): [ResponseStats[] | [], boolean] => {
	const [stats, setStats] = React.useState<ResponseStats[] | []>([])

	const [loading, setLoading] = React.useState(false)
	React.useEffect(() => {
		setLoading(true)
		const handlePromise = async () => {
			return await getStats(token, start_date, end_date, group_by, product).then((res) => res)
		}

		handlePromise().then((res) => {
			setStats(res)
			setLoading(false)
		})
	}, [start_date, end_date, group_by, product])

	return [stats, loading]
}
