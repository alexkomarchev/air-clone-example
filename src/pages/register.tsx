import * as React from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

import { RegisterEmailForm } from '@/src/features/register-by-email'
import { Layout } from '@/src/main/layout'
import { useAppSelector } from '@/src/main/store/store'
import { getRandomImage } from '@/src/pages/login'
import { RandomImage } from '@/src/shared'
import { TDeviceProp } from '@/src/shared/lib/types/entities'

export async function getServerSideProps(context: any): Promise<{ props: TDeviceProp }> {
	const UA = context.req.headers['user-agent']
	const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))

	return {
		props: {
			device: isMobile ? 'mobile' : 'desktop',
		},
	}
}

const Register: React.FC<TDeviceProp> = ({ device }) => {
	const refImage = React.useRef(getRandomImage())

	const desktop = device === 'desktop'

	const [isSuccess, setIsSuccess] = React.useState(false)

	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Layout titlePage={'Регистрация'} isAuthPage={true} device={device}>
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
				{isSuccess ? (
					<Box
						sx={{
							width: desktop ? '50vh' : '50vw',
							height: '100%',
							marginTop: desktop ? 0 : 5,
							textAlign: 'center',
							color: '#181C32',
						}}
					>
						<Image src={'/logo.svg'} alt={''} width={50} height={50} />
						<Typography
							sx={{
								marginTop: 2,
								color: theme === 'light' ? '#181C32' : '#E1E1E1',
							}}
						>
							Вы успешно зарегистрированы.
							<br />
							Мы отправили письмо для верификации на ваш email. В случае отсутствия, проверьте папку Спам.
						</Typography>
					</Box>
				) : (
					<Box
						sx={{
							width: '40vh',
							height: '100%',
							marginTop: desktop ? 0 : 5,
						}}
					>
						<Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
							<Typography
								variant='h1'
								sx={{
									color: theme === 'light' ? '#181C32' : '#E1E1E1',
									lineHeight: '36.4px',
									fontSize: '24px',
									fontWeight: '600',
								}}
							>
								Регистрация
							</Typography>
							<Typography
								variant='body2'
								sx={{
									color: '#A7A8BB',
									lineHeight: '25.2px',
									fontSize: '17px',
									fontWeight: '500px',
								}}
							>
								Уже есть аккаунт?{' '}
								<Link
									href='/login'
									style={{
										textDecoration: 'none',
										color: '#7F7DF3',
									}}
								>
									&nbsp;Авторизоваться
								</Link>
							</Typography>

							<RegisterEmailForm successLogin={() => setIsSuccess(true)} />
						</Stack>
					</Box>
				)}
				<Box></Box>
			</Stack>
		</Layout>
	)
}

export default Register
