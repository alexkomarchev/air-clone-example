import React from 'react'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from '@/src/main/layout'
import { useAppSelector } from '@/src/main/store/store'

const Custom404 = () => {
	const theme = useAppSelector((state) => state.theme.theme)

	const { push } = useRouter()

	React.useEffect(() => {
		setTimeout(() => push('/'), 7000)
	}, [])

	return (
		<Layout titlePage={'Неизвестная страница'} isAuthPage={true}>
			<Box display='flex' justifyContent='center' alignItems='center' sx={{ width: '100%', height: '90vh' }}>
				<Box sx={{ width: '410px', textAlign: 'center' }}>
					<Typography
						sx={{
							fontSize: '23px',
							color: theme === 'light' ? 'dark' : 'white',
						}}
					>
						Ошибка 404
					</Typography>
					<Typography
						sx={{
							fontSize: '19px',
							color: theme === 'light' ? 'dark' : 'white',
							marginTop: 1.5,
						}}
					>
						К сожалению, такая страница не найдена 😢
					</Typography>
					<Link href='/'>
						<Typography
							sx={{
								fontSize: '18px',
								marginTop: 2,
								color: '#7F7DF3',
							}}
						>
							Вернуться на главную
						</Typography>
					</Link>
				</Box>
			</Box>
		</Layout>
	)
}

export default Custom404
