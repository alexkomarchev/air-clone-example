import React from 'react'
import { Box, Stack } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'

import { Group, Product, RequestStats } from '@/src/features/get-admin-stats'
import { Select } from '@/src/shared'

interface StatsFiltersProps extends RequestStats {
	changeStartDate: (date: Dayjs | null) => void
	changeEndDate: (date: Dayjs | null) => void
	changeGroupBy: (date: Group) => void
	changeProduct: (date: Product) => void
	groupByList: Group[]
	productsList: Product[]
}

const StatsFilters: React.FC<StatsFiltersProps> = ({
	product,
	group_by,
	start_date,
	end_date,
	changeStartDate,
	changeEndDate,
	changeProduct,
	changeGroupBy,
	groupByList,
	productsList,
}) => {
	return (
		<Stack direction='column'>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker value={start_date} onChange={(e) => changeStartDate(e)} sx={{ marginBottom: 2 }} label='Начиная с' />
				<DatePicker value={end_date} onChange={(e) => changeEndDate(e)} label='По' />
				<Box sx={{ marginTop: 1 }}>
					<Select
						title='Сортировать по'
						value={group_by}
						onChange={(e) => changeGroupBy(e.target.value as Group)}
						list={groupByList}
					/>
				</Box>
				<Box sx={{ marginTop: 1 }}>
					<Select
						title='Тип продукта'
						value={product}
						onChange={(e) => changeProduct(e.target.value as Product)}
						list={productsList}
					/>
				</Box>
			</LocalizationProvider>
		</Stack>
	)
}

export default StatsFilters
