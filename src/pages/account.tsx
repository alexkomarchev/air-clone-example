import * as React from 'react'
import { useState } from 'react'
import { Alert, Avatar, Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'

import { Layout } from '@/src/main/layout'
import { useAppSelector } from '@/src/main/store/store'
import { Input, Modal, Success } from '@/src/shared'
import { accountApi } from '@/src/shared/api/account-endpoints'
import { API_HOST } from '@/src/shared/lib/constants/constants'
import { getAccessToken, getTypeDevice } from '@/src/shared/lib/helpers'
import * as styles from '@/src/shared/lib/styles/Account'
import { IProps } from '@/src/shared/lib/types/entities'
import { Payment } from '@/src/widgets/payment'

export interface IPaymentsPlan {
	uid: string
	price: string
	tokens_per_plan: string
}

interface IAccountProps extends IProps {
	plans: IPaymentsPlan[] | null
	redirect?: {
		destination: string
		permanent: boolean
	}
}

export async function getServerSideProps(context: any): Promise<{ props: IAccountProps }> {
	const device = getTypeDevice(context)

	const token = (await getAccessToken(context.req)) || null

	//@ts-ignore
	const session = await getServerSession(context.req, context.res)

	const plans = token ? await accountApi.getPaymentsPlans(token) : null

	//@ts-ignore
	if (!session) {
		return {
			//@ts-ignore
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			device,
			token,
			plans,
		},
	}
}

const Account: React.FC<IAccountProps> = ({ device, token, plans }) => {
	const [currentPassword, setCurrentPassword] = React.useState<string>('')

	const [newPassword1, setNewPassword1] = React.useState<string>('')

	const [isChangePassword] = React.useState(false)

	const [newPassword2, setNewPassword2] = React.useState<string>('')

	const [nightMode] = React.useState<boolean>(false)

	const [currentPasswordForDelete, setCurrentPasswordForDelete] = React.useState<string>('')

	const [errorConfirmPassword, setErrorConfirmPassword] = React.useState(false)

	const [success, setSuccess] = React.useState('')

	const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)

	const desktop = device === 'desktop'

	const theme = useAppSelector((state) => state.theme.theme)

	const { data: session } = useSession()

	const { data } = useSession()
	const changePassword = async () => {
		if (newPassword1 !== newPassword2) {
			return
		}
		const status = await accountApi.changePassword(token, newPassword1, newPassword2, currentPassword)

		if (status === 200) {
			setSuccess('Ваш пароль успешно изменён!')
			setNewPassword1('')
			setNewPassword2('')
			setCurrentPassword('')
			setTimeout(() => setSuccess(''), 6000)
			return
		}
	}

	const deleteAccount = async () => {
		setErrorConfirmPassword(false)
		if (!currentPasswordForDelete.trim()) {
			setErrorConfirmPassword(true)
			return
		}
		try {
			await axios.post(API_HOST + '/auth/login', {
				email: session?.user?.email,
				password: currentPasswordForDelete,
			})
			try {
				const { status } = await axios.delete(API_HOST + '/auth/remove', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				if (status === 200) await signOut()
			} catch (err) {}
		} catch (err) {
			setErrorConfirmPassword(true)
		}
	}

	return (
		<Layout titlePage={'Аккаунт'} device={device}>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					marginTop: desktop ? 5 : 2,
				}}
			>
				<Stack
					direction={desktop ? 'row' : 'column'}
					justifyContent='center'
					alignItems={desktop ? 'flex-start' : 'center'}
					spacing={2}
					sx={{ overflowY: 'auto', overflowX: 'hidden' }}
				>
					<Stack
						direction='column'
						justifyContent='flex-start'
						alignItems='flex-start'
						spacing={2}
						sx={{
							width: desktop ? '40%' : '100%',
							height: '100%',
						}}
					>
						<Stack
							sx={{
								backgroundColor: theme === 'light' ? '#FFFFFF' : '#4B4B4B',
								borderRadius: '16px',
								padding: 2.5,
								width: '100%',
							}}
							spacing={2}
						>
							<Stack direction='row' display='flex' alignItems='center'>
								<IconButton sx={{ padding: 0, marginRight: 1 }}>
									<Avatar sx={{ width: 55, height: 55 }}> {data?.user?.email![0]}</Avatar>
								</IconButton>
								<Typography sx={{ color: '#868686' }}>{data?.user?.email}</Typography>
							</Stack>
						</Stack>
						<Payment device={device} offers={plans} />
						<Stack
							sx={{
								backgroundColor: theme === 'light' ? '#FFFFFF' : '#4B4B4B',
								borderRadius: '16px',
								padding: 2.5,
								width: '100%',
							}}
							spacing={2}
						>
							<Typography sx={{ color: '#868686' }}>Изменить пароль</Typography>

							<Typography
								sx={
									!nightMode
										? {
												...styles.subscriptionColumnNight,
										  }
										: {
												...styles.subscriptionColumn,
										  }
								}
							>
								Текущий пароль
							</Typography>
							<Input value={currentPassword} onChange={(evt) => setCurrentPassword(evt.target.value)} />

							<Typography
								sx={
									!nightMode
										? {
												...styles.subscriptionColumnNight,
										  }
										: {
												...styles.subscriptionColumn,
										  }
								}
							>
								Новый пароль
							</Typography>
							<Input value={newPassword1} onChange={(evt) => setNewPassword1(evt.target.value)} />

							<Typography
								sx={
									!nightMode
										? {
												...styles.subscriptionColumnNight,
										  }
										: {
												...styles.subscriptionColumn,
										  }
								}
							>
								Подтвердить пароль
							</Typography>
							<Input value={newPassword2} onChange={(evt) => setNewPassword2(evt.target.value)} />

							<Button
								style={{ backgroundColor: '#7F7DF3' }}
								onClick={changePassword}
								sx={{
									padding: 1.5,
									borderRadius: '10px',
									color: '#FFFFFF',
									textTransform: 'none',
									width: desktop ? '126px' : '100%',

									'&:hover': {
										backgroundColor: '#7F7DF3',
									},
								}}
							>
								Сохранить
							</Button>
							<Typography
								onClick={() => setConfirmDeleteModal(true)}
								sx={{
									fontSize: '15px',
									lineHeight: '22.5px',
									color: '#FF4170',
									fontWeight: '500px',
									'&:hover': {
										cursor: 'pointer',
									},
								}}
							>
								Удалить аккаунт
							</Typography>
						</Stack>

						<Modal open={confirmDeleteModal} onClose={() => setConfirmDeleteModal(false)}>
							<Box sx={{ margin: 4, width: '320px' }}>
								<Typography
									sx={{
										textAlign: 'left',
										fontSize: 20,
										color: theme !== 'light' ? '#E1E1E1' : '#5A5A5A',
									}}
								>
									Удаление аккаунта
								</Typography>
								<Typography
									sx={{
										textAlign: 'left',
										color: '#868686',
										marginTop: 3,
										fontSize: 16,
									}}
								>
									Чтобы удалить аккаунт, пожалуйста, введите пароль от вашей учетной записи
								</Typography>
								<TextField
									error={errorConfirmPassword}
									sx={{
										'& label': { color: '#E1E1E1' },
										backgroundColor: theme === 'light' ? 'transparent' : '#3D3D3D',
										input: {
											color: theme === 'light' ? '#272727' : 'white',
										},
										marginTop: 3,
									}}
									fullWidth
									id='outlined-required'
									label='Ваш текущий пароль'
									onChange={(e) => setCurrentPasswordForDelete(e.target.value)}
								/>
								<Button onClick={deleteAccount} fullWidth sx={{ marginTop: 3 }} variant='outlined' color='error'>
									Удалить
								</Button>
							</Box>
						</Modal>

						{isChangePassword && (
							<Alert
								sx={{
									position: 'absolute',
									top: '5px',
									left: '43%',
								}}
							>
								Ваш пароль успешно изменён.
							</Alert>
						)}
						<Success message={success} open={Boolean(success)} />
					</Stack>
				</Stack>
			</Box>
		</Layout>
	)
}

export default Account
