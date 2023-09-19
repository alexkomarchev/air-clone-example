import React from 'react'
import { UseFormReturn } from 'react-hook-form'

import { CompanyData } from '../../api/get-company-date/types'

export const useAutoSetInfo = (
	methods: UseFormReturn<{ companyName: string; inn: string; ogrn: string }, any>,
	selected: CompanyData | null | string
) => {
	React.useEffect(() => {
		if (selected === null) {
			return
		}

		if (typeof selected === 'string') {
			return
		}
		methods.setValue('inn', selected.data.inn)
		methods.setValue('ogrn', selected.data.ogrn)
	}, [selected])
}
