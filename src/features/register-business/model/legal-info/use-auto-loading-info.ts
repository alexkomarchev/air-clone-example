import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { useAppDispatch } from '@/src/main/store/store'

import { getDataCompany } from '../stepper-slice'

export const useAutoLoadingInfo = (methods: UseFormReturn<{ companyName: string; inn: string; ogrn: string }, any>) => {
	const company = methods.watch('companyName')

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (company.trim()) {
			dispatch(getDataCompany(company))
		}
	}, [company])
}
