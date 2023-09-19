import * as React from 'react'
import { useForm } from 'react-hook-form'
import { SubmitErrorHandler } from 'react-hook-form/dist/types/form'
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'
import Router from 'next/router'
import Script from 'next/script'
import { signIn, useSession } from 'next-auth/react'

import { authTelegram } from '@/src/features/auth-telegram'
import { PasswordOptions } from '@/src/features/register-by-email/lib/constants'
import { IEmailForms } from '@/src/features/register-by-email/model/types'
import { Layout } from '@/src/main/layout'
import { useAppSelector } from '@/src/main/store/store'
import { emailOptions } from '@/src/shared'
import { Error } from '@/src/shared'
import { RandomImage } from '@/src/shared'
import {accountApi} from '@/src/shared/api/account-endpoints';
import { getTypeDevice } from '@/src/shared/lib/helpers'
import { useShowData } from '@/src/shared/lib/hooks'
import { TDeviceProp } from '@/src/shared/lib/types/entities'
import { InputStyleDark, InputStyleLight } from '@/src/shared/ui/input'

export async function getServerSideProps(context: any): Promise<{ props: TDeviceProp }> {
	const device = getTypeDevice(context)

	return {
		props: {
			device,
		},
	}
}

export const getRandomImage = (): string => {
	return String(Math.floor(Math.random() * 29) + 1) + '.png'
}

const Login: React.FC<TDeviceProp> = ({ device }) => {
	const { error, showError } = useShowData()

	const [loading, setLoading] = React.useState(false)

	const desktop = device === 'desktop'

	const { register, handleSubmit, reset } = useForm()

	async function onSubmit(data: any) {
		setLoading(true)

		if (window.sessionStorage.__telegram__initParams !== '{}') {
			await authTelegram(data.email, data.password)
			setLoading(false)
			reset()
			return
		}

		const res = await signIn('credentials', {
			username: data.email,
			password: data.password,
			redirect: false,
			callbackUrl: '/',
		})
		if (res?.error) {
			setLoading(false)
			showError('Ошибка входа')
			return
		}

		await Router.push('/')

		setLoading(false)

		res?.error ? showError('Ошибка входа') : ''
	}

	const checkError: SubmitErrorHandler<IEmailForms> = (data) => {
		showError(Object.values(data)[0].message || 'Неверные данные')
	}

	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter') {
			handleSubmit(onSubmit)()
		}
	}

	const handleInputChangeTrim = (event: any) => {
		event.target.value = event.target.value.trim()
	}

	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Layout titlePage={'Авторизация'} device={device} isAuthPage={true}>
			<Script src='https://telegram.org/js/telegram-web-app.js' />
			<Stack
				direction={desktop ? 'row' : 'column'}
				alignItems='center'
				justifyContent={desktop ? 'space-between' : 'center'}
				sx={{
					padding: 0,
					margin: desktop ? 0 : '60px auto',
					backgroundColor: theme === 'light' ? 'white' : '#373737',
				}}
			>
				{desktop && <RandomImage />}

				{!desktop && <Image src={'/logo.svg'} alt={''} width={50} height={50} />}
				<form onKeyDown={handleKeyDown}>
					<Box
						sx={{
							width: '40vh',
							height: '100%',
							marginTop: desktop ? 0 : 5,
						}}
						onKeyDown={async (e) => {
							if (e.key === 'Enter') {
								await handleSubmit(onSubmit, checkError)
							}
						}}
					>
						<Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
							<Typography
								sx={{
									color: theme === 'light' ? '#181C32' : '#E1E1E1',
									lineHeight: '36.4px',
									fontSize: '24px',
									fontWeight: '600',
								}}
							>
								Вход
							</Typography>
							<Typography
								variant='body2'
								sx={{
									color: '#A7A8BB',
									fontSize: '17px',
									fontWeight: '500px',
								}}
							>
								Нет аккаунта?{' '}
								<Link
									href='/register'
									style={{
										textDecoration: 'none',
										color: '#7F7DF3',
									}}
								>
									Зарегистрироваться
								</Link>
							</Typography>

							<Typography
								variant='body2'
								sx={{
									color: theme === 'light' ? '#181C32' : '#A6A5A5',
									lineHeight: '19.6px',
									fontSize: '14px',
									fontWeight: '600',
									paddingTop: 1,
									paddingRight: '90%',
								}}
							>
								Email
							</Typography>
							<TextField
								fullWidth
								sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
								{...register('email', emailOptions)}
								onChange={handleInputChangeTrim}
							/>

							<Box
								sx={{
									width: '100%',
									paddingTop: 1,
									justifyContent: 'space-between',
									display: 'flex',
								}}
							>
								<Box>
									<Typography
										variant='body2'
										display='inline'
										sx={{
											color: theme === 'light' ? '#181C32' : '#A6A5A5',
											lineHeight: '19.6px',
											fontSize: '14px',
											fontWeight: '600',
										}}
									>
										Пароль
									</Typography>
								</Box>
								<Box>
									<Typography
										variant='body2'
										display='inline'
										sx={{
											color: '#8153FB',
											lineHeight: '19.6px',
											fontSize: '14px',
											fontWeight: '600px',
										}}
									>
										<Link
											href='/reset'
											style={{
												textDecoration: 'none',
												color: '#7F7DF3',
											}}
										>
											Забыли пароль?
										</Link>
									</Typography>
								</Box>
							</Box>

							<TextField
								type='password'
								fullWidth
								sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
								{...register('password', {
									...PasswordOptions,
								})}
							/>
							<Box sx={{ height: '50px', width: '100%' }}>
								{!loading ? (
									<Button
										variant='contained'
										style={{
											marginTop: '25px',
										}}
										sx={{
											backgroundColor: '#7F7DF3',
											color: '#FFFFFF',
											lineHeight: '20px',
											fontSize: '16px',
											fontWeight: '600px',
											borderRadius: '13px',
											textTransform: 'none',
											width: '100%',
											height: 48,
											'&:hover': {
												backgroundColor: '#7F7DF3',
												opacity: [0.9, 0.8, 0.7],
											},
										}}
										onClick={handleSubmit(onSubmit, checkError)}
									>
										Войти
									</Button>
								) : (
									<Box
										style={{
											margin: '25px auto',
											display: 'flex',
											justifyContent: 'center',
										}}
									>
										<CircularProgress size={30} thickness={5} sx={{ color: '#7F7DF3' }} />
									</Box>
								)}
							</Box>

							<Error error={error} open={Boolean(error)} />
						</Stack>
					</Box>
				</form>

				<Box></Box>
			</Stack>
		</Layout>
	)
}

export default Login
