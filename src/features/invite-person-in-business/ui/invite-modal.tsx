import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitErrorHandler } from 'react-hook-form/dist/types/form'
import { Box, TextField, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'

import { invitePerson } from '@/src/features/invite-person-in-business/api/invite-person'
import { IEmailForms } from '@/src/features/register-by-email/model/types'
import { useAppSelector } from '@/src/main/store/store'
import {
	ButtonGray,
	ButtonUI,
	emailOptions,
	Error,
	InputStyleDark,
	InputStyleLight,
	Modal,
	ModalProps,
	onlyNumbersOption,
	Select,
} from '@/src/shared'
import { useShowData } from '@/src/shared/lib/hooks'

import { InviteRoles, inviteRoles } from '../lib/constants'
import { ResponseGetPersons } from '../model/types'

import styles from './invite-modal.module.scss'

interface InviteModalProps extends ModalProps {
	showNewPersons: (persons: ResponseGetPersons) => void
}
export const InviteModal: FC<InviteModalProps> = ({ open, onClose, showNewPersons }) => {
	const [role, setRole] = useState<InviteRoles>('Сотрудник')

	const { handleSubmit, register, reset } = useForm()

	const { error, showError } = useShowData()

	const { data: session } = useSession()
	const onSubmit = async (data: any) => {
		const res = await invitePerson(role, data.limit, data.email, session?.access)

		if (res === null) {
			showError('Что-то пошло не так')
			return
		}

		onClose()

		reset()

		showNewPersons(res)
	}
	const checkError: SubmitErrorHandler<IEmailForms> = (data) => {
		showError(Object.values(data)[0].message || 'Неверные данные')
	}

	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Modal open={open} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box className={styles.wrap}>
					<Typography className={styles.title}>Пригласить сотрудника</Typography>
					<Typography className={styles.hint}>Выберите роль</Typography>
					<Select list={Object.values(inviteRoles)} onChange={(e) => setRole(e.target.value as InviteRoles)} value={role}></Select>
					<Typography className={styles.hint}>Укажите адрес электронной почты</Typography>
					<TextField
						fullWidth
						sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
						{...register('email', emailOptions)}
					/>
					{/*<Typography className={styles.hint}>Укажите лимит токенов</Typography>*/}
					{/*<TextField*/}
					{/*	fullWidth*/}
					{/*	sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}*/}
					{/*	{...register('limit', onlyNumbersOption)}*/}
					{/*/>*/}
					<Box className={styles.buttons}>
						<Box>
							<ButtonGray onClick={onClose} text='Отмена' />
						</Box>
						<ButtonUI onClick={handleSubmit(onSubmit, checkError)} text='Отправить' />
					</Box>
				</Box>
			</form>
			<Error error={error} open={Boolean(error)} />
		</Modal>
	)
}
