import * as React from 'react'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { INeuronModel } from '@/src/pages'
import { translateTypeModel } from '@/src/shared'
import { TDevice } from '@/src/shared/lib/types/entities'

interface IUnActiveCardProps extends INeuronModel {
	device: TDevice
}

export const UnActiveCard: React.FC<IUnActiveCardProps> = ({ title, image_link, languages, description, model_config, device }) => {
	const desktop = device === 'desktop'

	return (
		<CardContent
			sx={{
				padding: 1,
				width: desktop ? '433px' : '100%',
				cursor: 'pointer',
				overflow: 'hidden',
			}}
		>
			<CardMedia
				sx={{
					marginRight: 8,
					marginTop: desktop ? 2 : 0,
					height: 300,
					borderRadius: 7,
					position: 'relative',
					width: '100%',
					background: `linear-gradient(180deg, #3E3E3E -24.82%, rgba(0, 0, 0, 0) 55.54%), url(${image_link})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<Stack>
					<Box sx={{ position: 'relative' }}>
						<Box
							sx={{
								position: 'relative',
								height: '300px',
							}}
						></Box>
						<Typography
							sx={{
								position: 'absolute',
								bottom: 30,
								left: 25,
								fontWeight: '550',
								padding: '7px 12px',
								backgroundColor: 'rgba(255, 255, 255, 0.7)',
								border: 'none',
								fontSize: '13px',
								color: '#454545',
								borderRadius: '13px',
							}}
						>
							{translateTypeModel(model_config.model_type)}
						</Typography>

						<Box
							sx={{
								position: 'absolute',
								top: 20,
								left: 25,
								width: '65%',
							}}
						>
							<Typography
								variant='h5'
								component='div'
								sx={{
									lineHeight: '35px',
									marginTop: desktop ? 1 : 0.2,
									color: 'white',
									fontWeight: '500',
									fontSize: '32px',
								}}
							>
								{title}
							</Typography>
							<Typography
								variant='body2'
								sx={{
									marginTop: desktop ? 1 : 0.2,
									color: 'white',
									fontSize: '14px',
								}}
							>
								{description}
							</Typography>
						</Box>
					</Box>
				</Stack>
			</CardMedia>
		</CardContent>
	)
}
