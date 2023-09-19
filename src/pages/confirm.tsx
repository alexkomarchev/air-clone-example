import React from 'react'
import { Box, Typography } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from '@/src/main/layout'
import { API_HOST } from '@/src/shared/lib/constants/constants'

export async function getServerSideProps(context: any): Promise<{ props: any }> {
	const UA = context.req.headers['user-agent']
	const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))
	return {
		props: {
			device: isMobile ? 'mobile' : 'desktop',
		},
	}
}

const Confirm: React.FC = () => {
	const { push, query } = useRouter()
	const [success, setSuccess] = React.useState(false)

	React.useEffect(() => {
		let formData: any = new FormData()

		formData.append('token', query.token)

		axios.post(API_HOST + '/auth/confirm', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
			.then(() => {
				setSuccess(true)
			})
			.catch(() => {
				push('/')
			})
	}, [])

	React.useEffect(() => {
		if (success) {
			setTimeout(() => push('/login'), 10000)
		}
	}, [success])

	return (
		<Layout titlePage={'Подтверждение аккаунта'} isAuthPage={true}>
			<Box
				sx={{
					width: '100%',
					height: '100vh',
					alignItems: 'center',
					display: 'flex',
				}}
			>
				<Typography
					sx={{
						margin: '0 auto',
						textAlign: 'center',
					}}
				>
					{' '}
					{success ? (
						<>
							<Typography sx={{ color: '#7F7DF3', fontSize: 17 }}>
								Ваша почта подтверждена, вы будете перенаправлены на страницу авторизации
							</Typography>
							<Link style={{ color: '#7F7DF3', fontSize: 17 }} href={'/login'}>
								Войти в аккаунт
							</Link>
						</>
					) : (
						'Подтверждение...'
					)}
				</Typography>
			</Box>
		</Layout>
	)
}

export default Confirm
