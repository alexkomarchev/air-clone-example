import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { SubmitErrorHandler } from 'react-hook-form/dist/types/form'
import { Box, TextField, Typography } from '@mui/material'

import { FieldActivity, FieldActivitySelect, Frequency, FrequencySelect } from '@/src/features/register-business/lib/constants-step-information'
import { IEmailForms } from '@/src/features/register-by-email/model/types'
import { useAppDispatch, useAppSelector } from '@/src/main/store/store'
import { ButtonUI, InputStyleDark, InputStyleLight } from '@/src/shared'
import { Error } from '@/src/shared'
import { useShowData } from '@/src/shared/lib/hooks'
import { SelectUI } from '@/src/shared/ui/select'

import { setFieldActivity, setFrequency, setNumberStuff, switchNextStep } from '../../model/stepper-slice'

import styles from './step-information.module.scss'
export const StepInformation = () => {
	const dispatch = useAppDispatch()

	const { frequency, fieldActivity, numberStuff } = useAppSelector((state) => state.stepper.dataForCreate)

	const { error, showError } = useShowData()

	const methods = useForm({
		mode: 'onSubmit',
		defaultValues: {
			frequency,
			fieldActivity,
			numberStuff,
		},
	})
	const onSubmit = (data: any) => {
		dispatch(setNumberStuff(data.numberStuff))
		dispatch(switchNextStep())
	}

	const checkError: SubmitErrorHandler<IEmailForms> = (data) => {
		showError(Object.values(data)[0].message || 'Неверные данные')
	}

	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<FormProvider {...methods}>
			<form id={'step1'} onSubmit={methods.handleSubmit(onSubmit)}>
				<Box className={styles.element}>
					<Typography>Ваша сфера деятельности</Typography>
					<SelectUI
						list={Object.values(FieldActivitySelect)}
						value={fieldActivity}
						onChange={(e: any) => dispatch(setFieldActivity(e.target.value as FieldActivity))}
					/>
				</Box>
				<Box className={styles.element}>
					<Typography>Как часто планируете использовать нейросети?</Typography>
					<SelectUI
						list={Object.values(FrequencySelect)}
						value={frequency}
						onChange={(e: any) => dispatch(setFrequency(e.target.value as Frequency))}
					/>
				</Box>
				<Box className={styles.element}>
					<Typography>Сколько вы планируете подключить сотрудников?</Typography>
					<TextField
						fullWidth
						sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
						{...methods.register('numberStuff', {
							pattern: {
								value: /^[0-9]+$/,
								message: 'Пожалуйста введите кол-во сотрудников числом',
							},
						})}
					/>
				</Box>
				<Box className={styles.btn}>
					<ButtonUI onClick={methods.handleSubmit(onSubmit, checkError)} text='Продолжить' />
				</Box>
				<Error error={error} open={Boolean(error)} />
			</form>
		</FormProvider>
	)
}
