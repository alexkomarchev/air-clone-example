import React from 'react'
import { Box, Typography } from '@mui/material'

import { Layout } from '@/src/main/layout'

const ApiKeys: React.FC = () => {
	return (
		<Layout titlePage={'API-ключи'} device={'desktop'}>
			<Box
				sx={{
					backgroundColor: '#FFF',
					width: '100%',
					height: '100vh',
					overflow: 'hidden',
				}}
			>
				<Typography>Пока недоступно!</Typography>
			</Box>
		</Layout>
	)
}

export default ApiKeys
