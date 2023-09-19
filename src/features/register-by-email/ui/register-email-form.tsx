import React from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form/dist/types/form'
import { Button, Checkbox, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useRouter } from 'next/router'

import { PasswordOptions } from '@/src/features/register-by-email/lib/constants'
import { IEmailForms } from '@/src/features/register-by-email/model/types'
import { emailOptions } from '@/src/shared'
import { CheckBoxAgreeWithRules } from '@/src/shared'
import { Error } from '@/src/shared'
import { InputStyleDark, InputStyleLight } from '@/src/shared'
import { API_HOST, API_URL } from '@/src/shared/lib/constants/constants'
import { useShowData } from '@/src/shared/lib/hooks'
import { useThemeAndDevice } from '@/src/shared/lib/hooks'

interface IRegisterEmailFormProps {
	successLogin: () => void
}

export const RegisterEmailForm: React.FC<IRegisterEmailFormProps> = ({ successLogin }) => {
	const { register, handleSubmit, reset, watch } = useForm()

	const { theme, desktop } = useThemeAndDevice()

	const { error, showError } = useShowData()

	const { push } = useRouter()

	const [loading, setLoading] = React.useState(false)

	const [cookie] = useCookies()
	const makeNewAccount: SubmitHandler<any> = async (data) => {
		setLoading(true)
		try {
			const { status } = await axios.post(API_URL + '/auth/register', {
				email: data.email,
				password: data.password1,
				utm_source: cookie.utm_source,
				utm_medium: cookie.utm_medium,
				utm_campaign: cookie.utm_campaign,
				utm_term: cookie.utm_campaign,
				utm_content: cookie.utm_campaign,
			})
			if (status === 201) {
				setLoading(false)
				reset()
				successLogin()
				setTimeout(() => push('/login'), 7000)
			}
		} catch (err) {
			setLoading(false)
			showError('Такой email уже используется')
		}
	}

	const checkError: SubmitErrorHandler<IEmailForms> = (data) => {
		showError(Object.values(data)[0].message || 'Неверные данные')
	}

	const handleInputChangeTrim = (event: any) => {
		event.target.value = event.target.value.trim()
	}

	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter') {
			handleSubmit(makeNewAccount)()
		}
	}

	return (
		<form onKeyDown={handleKeyDown}>
			<Typography
				variant='body2'
				sx={{
					color: theme === 'light' ? '#181C32' : '#A6A5A5',
					lineHeight: '19.6px',
					fontSize: '14px',
					fontWeight: '550',
					paddingTop: 1,
					width: '100%',
					marginBottom: 1.5,
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

			<Typography
				variant='body2'
				sx={{
					color: theme === 'light' ? '#181C32' : '#A6A5A5',
					lineHeight: '19.6px',
					fontSize: '14px',
					fontWeight: '550',
					paddingTop: 1,
					width: '100%',
					marginBottom: 1.5,
				}}
			>
				Пароль
			</Typography>

			<TextField
				type='password'
				fullWidth
				sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
				{...register('password1', {
					...PasswordOptions,
				})}
			/>

			<Typography
				variant='body2'
				sx={{
					color: theme === 'light' ? '#181C32' : '#A6A5A5',
					lineHeight: '19.6px',
					fontSize: '14px',
					fontWeight: '550',
					paddingTop: 1,
					width: '100%',
					marginBottom: 1.5,
				}}
			>
				Подтвердите пароль
			</Typography>

			<TextField
				type='password'
				fullWidth
				sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
				{...register('password2', {
					...PasswordOptions,
					validate: (val: string) => {
						if (watch('password1') != val) {
							return 'Пароли не совпадают'
						}
					},
				})}
			/>

			<CheckBoxAgreeWithRules register={register} name={'rules'} />

			<Box display='flex' width='100%' sx={{ marginTop: 1 }}>
				<Checkbox
					{...register('spam', {
						required: 'Примите соглашение на получение информационных писем',
					})}
					// checked={isAgreeWithEmail}
					// onChange={() => setIsAgreeWithEmail(prev => !prev)}
					size='medium'
					sx={{
						color: '#7F7DF3',
						'&.Mui-checked': {
							color: '#7F7DF3',
						},
					}}
				/>
				<Typography
					sx={{
						fontSize: '15px',
						marginTop: 1.1,
						color: '#868686',
					}}
				>
					{' '}
					Я соглашаюсь на получение-информационно-рекламных писем
				</Typography>
			</Box>

			<Box sx={{ height: '50px', width: '100%' }}>
				{loading ? (
					<Box
						style={{
							margin: '25px auto',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<CircularProgress size={30} thickness={5} sx={{ color: '#7F7DF3' }} />
					</Box>
				) : (
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
							width: desktop ? '177px' : '100%',
							height: 50,
							'&:hover': {
								backgroundColor: '#7F7DF3',
								opacity: [0.9, 0.8, 0.7],
							},
						}}
						onClick={handleSubmit(makeNewAccount, checkError)}
					>
						Создать аккаунт
					</Button>
				)}
			</Box>

			<Error error={error} open={Boolean(error)} />
		</form>
	)
}
