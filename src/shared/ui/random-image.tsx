import React from 'react'
import { Card, CardMedia } from '@mui/material'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { getRandomImage } from '@/src/pages/login'

export const RandomImage = () => {
	const refImage = React.useRef(getRandomImage())

	return (
		<Card>
			<CardMedia sx={{ height: '100vh', width: '600px' }} image={`/login_images/${refImage.current}`}>
				<Stack
					direction='column-reverse'
					justifyContent='flex-start'
					alignItems='flex-start'
					spacing={2}
					sx={{
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
	)
}
