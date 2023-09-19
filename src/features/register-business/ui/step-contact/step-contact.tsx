import React from 'react'
import { useForm } from 'react-hook-form'
import { SubmitErrorHandler } from 'react-hook-form/dist/types/form'
import { Box, TextField, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'

import styles from '@/src/features/register-business/ui/step-information/step-information.module.scss'
import { IEmailForms } from '@/src/features/register-by-email/model/types'
import { useAppDispatch, useAppSelector } from '@/src/main/store/store'
import { ButtonUI, Error, InputStyleDark, InputStyleLight } from '@/src/shared'
import { emailOptions } from '@/src/shared'
import { phoneOptions } from '@/src/shared/lib/constants/hook-form-options'
import { useShowData } from '@/src/shared/lib/hooks'

import { nameOptions } from '../../lib/constants-step-contact'
import { createBusinessCompany, setContact } from '../../model/stepper-slice'

export const StepContact = () => {
	const { phone, email, name, job_title } = useAppSelector((state) => state.stepper.dataForCreate)

	const theme = useAppSelector((state) => state.theme.theme)

	const { error, showError } = useShowData()
	const checkError: SubmitErrorHandler<IEmailForms> = (data) => {
		showError(Object.values(data)[0].message || 'Неверные данные')
	}

	const dispatch = useAppDispatch()

	const { data: session } = useSession()
	const onSubmit = (data: any) => {
		const { name, email, phone, job_title } = data
		dispatch(setContact({ name, email, phone, job_title }))
		dispatch(createBusinessCompany(session?.access || null))
	}

	const methods = useForm({
		defaultValues: {
			phone,
			email,
			name,
			job_title,
		},
	})

	return (
		<form>
			<Box id={'step3'} className={styles.element}>
				<Typography>Как в вам обращаться?</Typography>
				<TextField
					fullWidth
					sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
					{...methods.register('name', nameOptions)}
				/>
			</Box>
			<Box className={styles.element}>
				<Typography>Ваша должность</Typography>
				<TextField
					fullWidth
					sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
					{...methods.register('job_title', nameOptions)}
				/>
			</Box>
			<Box className={styles.element}>
				<Typography>Ваш email</Typography>
				<TextField
					fullWidth
					sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
					{...methods.register('email', emailOptions)}
				/>
			</Box>
			<Box className={styles.element}>
				<Typography>Ваш телефон</Typography>
				<TextField
					fullWidth
					sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
					{...methods.register('phone', phoneOptions)}
				/>
			</Box>
			<Box className={styles.btn}>
				<ButtonUI onClick={methods.handleSubmit(onSubmit, checkError)} text='Создать' />
			</Box>
			<Error error={error} open={Boolean(error)} />
		</form>
	)
}
