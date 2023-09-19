import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitErrorHandler } from 'react-hook-form/dist/types/form'
import { Autocomplete, Box, TextField, Typography } from '@mui/material'

import { CompanyData } from '@/src/features/register-business/api/get-company-date/types'
import { useCheckTypeCompany } from '@/src/features/register-business/model/legal-info/use-check-type-company'
import styles from '@/src/features/register-business/ui/step-information/step-information.module.scss'
import { IEmailForms } from '@/src/features/register-by-email/model/types'
import { useAppDispatch, useAppSelector } from '@/src/main/store/store'
import { ButtonUI, Error, InputStyleDark, InputStyleLight } from '@/src/shared'
import { useShowData } from '@/src/shared/lib/hooks'

import { companyNameOptions, innOptions, ogrnOptions } from '../../lib/constatnts-step-legal-informative'
import { useAutoLoadingInfo } from '../../model/legal-info/use-auto-loading-info'
import { useAutoSetInfo } from '../../model/legal-info/use-auto-set-info'
import { setCompanyName, setInn, setOgrn, switchNextStep } from '../../model/stepper-slice'
export const StepLegalInformative = () => {
	const theme = useAppSelector((state) => state.theme.theme)

	const dispatch = useAppDispatch()

	const { companyName, ogrn, inn } = useAppSelector((state) => state.stepper.dataForCreate)

	const suggestedCompany = useAppSelector((state) => state.stepper.company)

	const [selected, setSelected] = React.useState<CompanyData | null | string>(
		() => suggestedCompany.filter((el) => el.value === companyName)[0] || null
	)

	const methods = useForm({
		defaultValues: {
			companyName,
			inn,
			ogrn,
		},
	})

	const [rulesData, isIP] = useCheckTypeCompany(typeof selected === 'string' ? selected : selected?.value)

	const { error, showError } = useShowData()
	const onSubmit = (data: any, e: any) => {
		e.preventDefault()
		dispatch(setCompanyName(data.companyName))
		dispatch(setInn(data.inn))
		dispatch(setOgrn(data.ogrn))
		dispatch(switchNextStep())
	}

	useAutoLoadingInfo(methods)

	useAutoSetInfo(methods, selected)

	const checkError: SubmitErrorHandler<IEmailForms> = (data, event) => {
		event!.preventDefault()
		showError(Object.values(data)[0].message || 'Неверные данные')
	}

	return (
		<form id={'step2'} onSubmit={methods.handleSubmit(onSubmit, checkError)}>
			<Box className={styles.element}>
				<Typography>Наименование вашей организации</Typography>
				<Autocomplete
					disablePortal
					freeSolo
					clearText={'Очистить'}
					noOptionsText={'Не найдено'}
					options={suggestedCompany}
					value={selected}
					onChange={(event, value) => setSelected(value)}
					getOptionLabel={(label) => (typeof label !== 'string' ? label.value : '')}
					renderInput={(params) => (
						<TextField
							{...params}
							fullWidth
							sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
							{...methods.register('companyName', companyNameOptions)}
						/>
					)}
				/>
			</Box>
			<Box className={styles.element}>
				<Typography>ИНН</Typography>
				<TextField
					fullWidth
					sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
					{...methods.register('inn', rulesData.inn)}
				/>
			</Box>
			<Box className={styles.element}>
				<Typography>{isIP ? 'ОГРНИП' : 'ОГРН'}</Typography>
				<TextField
					fullWidth
					sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
					{...methods.register('ogrn', rulesData.ogrn)}
				/>
			</Box>
			<Box className={styles.btn}>
				<ButtonUI onClick={methods.handleSubmit(onSubmit, checkError)} text='Продолжить' />
			</Box>
			<Error error={error} open={Boolean(error)} />
		</form>
	)
}
