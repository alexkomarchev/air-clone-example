import * as React from 'react'
import { useState } from 'react'
import { Box, Card, CardMedia, Link, Stack, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'

import { Layout } from '@/src/main/layout'
import { useAppSelector } from '@/src/main/store/store'
import { getRandomImage } from '@/src/pages/login'
import { Error } from '@/src/shared'
import { API_HOST } from '@/src/shared/lib/constants/constants'
import { getTypeDevice } from '@/src/shared/lib/helpers'
import { TDeviceProp } from '@/src/shared/lib/types/entities'

export async function getServerSideProps(context: any): Promise<{ props: TDeviceProp }> {
	const device = getTypeDevice(context)

	return {
		props: {
			device,
		},
	}
}

const Reset: React.FC<TDeviceProp> = ({ device }) => {
	const [input_email, set_Email] = useState<string>('')
	const [isSend, setIsSend] = useState(false)
	const [isError, setIsError] = React.useState(false)
	const sendMail = () => {
		axios.post(API_HOST + '/auth/update-pass', {
			email: input_email,
		})
			.then(function (response) {
				if (response.status === 200) {
					setIsSend(true)
					setTimeout(() => Router.push('/login'), 10000)
				}
			})
			.catch(function (error) {
				setIsError(true)
				setTimeout(() => setIsError(false), 4000)
			})
	}

	const desktop = device === 'desktop'

	const refImage = React.useRef(getRandomImage())

	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Layout titlePage={'Восстановление пароля'} device={device} isAuthPage={true}>
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
				{desktop && (
					<Card>
						<CardMedia sx={{ height: '100vh', width: '600px' }} image={`/login_images/${refImage.current}`}>
							<Stack
								direction='column-reverse'
								justifyContent='flex-start'
								alignItems='flex-start'
								spacing={2}
								sx={{
									wdith: '100%',
									height: '100%',
									paddingBottom: 3,
									paddingLeft: 3,
								}}
							>
								<Typography
									variant='body2'
									sx={{
										color: '#FFFFFF',
										lineHeight: '23.8px',
										fontSize: '17px',
										fontWeight: '400px',
									}}
								>
									Midjourney
								</Typography>
								<Typography
									variant='body2'
									sx={{
										color: '#FFFFFF',
										lineHeight: '28px',
										fontSize: '20px',
										fontWeight: '600px',
									}}
								>
									by honeynek
								</Typography>
							</Stack>
						</CardMedia>
					</Card>
				)}
				{!isSend ? (
					<Box
						sx={{
							width: '70%',
							height: '100%',
							marginTop: desktop ? 0 : 25,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '350px' }}>
							<Typography
								variant='h1'
								sx={{
									color: theme === 'light' ? '#181C32' : '#E1E1E1',
									lineHeight: '36.4px',
									fontSize: '26px',
									fontWeight: '600px',
									paddingBottom: 1,
								}}
							>
								Забыли пароль?
							</Typography>

							<Typography
								sx={{
									color: '#A6A5A5',
									lineHeight: '27px',
									fontSize: '18px',
									fontWeight: '400px',
									textAlign: 'left',
								}}
							>
								Введите адрес электронной почты, которую вы использовали для регистрации в сервисе
							</Typography>
							<Typography
								variant='body2'
								sx={{
									color: theme === 'light' ? '#181C32' : '#A6A5A5',
									lineHeight: '19.6px',
									fontSize: '14px',
									fontWeight: '600px',
									paddingTop: 1,
									paddingRight: '90%',
								}}
							>
								Email
							</Typography>
							<TextField
								onChange={(event) => set_Email(event.target.value)}
								type={'email'}
								fullWidth
								style={{ borderRadius: '15px', border: 'none' }}
								sx={{
									marginBottom: 2,
									paddingTop: 0,
									paddingBottom: 0,
									'& label': { color: '#8853FA' },
									backgroundColor: theme === 'light' ? 'transparent' : '#3D3D3D',
									input: {
										color: theme === 'light' ? '#272727' : '#E1E1E1',
									},
								}}
							/>
							<Link
								style={{
									position: 'absolute',
									top: 45,
									right: '7%',
									cursor: 'pointer',
									fontSize: 17,
								}}
								href={'/'}
							>
								<Image src={'/x-mark.svg'} width={18} height={18} alt={''} />
							</Link>
							<Button
								variant='contained'
								fullWidth
								sx={{
									backgroundColor: '#7F7DF3',
									color: '#FFFFFF',
									lineHeight: '20px',
									fontSize: '16px',
									fontWeight: '600px',
									borderRadius: '13px',
									textTransform: 'none',
									height: 48,
									'&:hover': {
										backgroundColor: '#8153FB',
										opacity: [0.9, 0.8, 0.7],
									},
								}}
								onClick={sendMail}
							>
								Восстановить аккаунт
							</Button>
							<Error open={isError} error={'Аккаунт с такой почтой не найдено'} />
						</Stack>
					</Box>
				) : (
					<Box
						sx={{
							width: '40vh',
							height: '100%',
							marginRight: '25%',
						}}
					>
						<Typography
							sx={{
								fontSize: 21,
								textAlign: 'center',
								color: theme === 'light' ? '#272727' : '#E1E1E1',
							}}
						>
							Письмо для восстановления пароля отправлено вам на почту!
						</Typography>
					</Box>
				)}
			</Stack>
		</Layout>
	)
}

export default Reset
