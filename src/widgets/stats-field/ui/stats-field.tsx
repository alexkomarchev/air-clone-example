import React, { memo } from 'react'
import { Box } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'

import { Group, Product, Stats } from '@/src/features/get-admin-stats'
import { IProps } from '@/src/shared/lib/types/entities'

import StatsFilters from '../ui/stats-filters'

export const StatsField: React.FC<IProps> = memo(({ device, token, theme }) => {
	const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs('2023-05-27'))

	const [endDate, setEndDate] = React.useState<Dayjs | null>(null)

	const [groupBy, setGroupBy] = React.useState<Group>('DAY')

	const [product, setProduct] = React.useState<Product>('ALL')

	const groupList: Group[] = ['DAY', 'WEEK', 'MONTH']

	const productList: Product[] = ['API', 'ALL', 'CORPORATE', 'PLATFORM']

	return (
		<Box sx={{ width: '100%' }} display='flex'>
			<StatsFilters
				group_by={groupBy}
				changeGroupBy={(value) => setGroupBy(value)}
				groupByList={groupList}
				end_date={endDate}
				changeEndDate={(date) => setEndDate(date)}
				changeStartDate={(date) => setStartDate(date)}
				start_date={startDate}
				product={product}
				changeProduct={(product) => setProduct(product)}
				productsList={productList}
			/>
			<Stats theme={theme} device={device} token={token} start_date={startDate} end_date={endDate} group_by={groupBy} product={product} />
		</Box>
	)
})

StatsField.displayName = 'StatsField'
