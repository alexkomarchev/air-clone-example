import React from 'react'
import { Box, Typography } from '@mui/material'

import { useThemeAndDevice } from '@/src/shared/lib/hooks'

interface ISuggestedMessage {
	title: string
	sendMessage?: (title: string) => void
}

const SuggestedMessage: React.FC<ISuggestedMessage> = ({ title, sendMessage }) => {
	const { theme } = useThemeAndDevice()

	return (
		<Box
			onClick={() => sendMessage!(title)}
			sx={{
				boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
				padding: '10px 14px',
				backgroundColor: theme === 'light' ? 'white' : '#3D3D3D',
				borderRadius: '8px',
				color: '#7F7DF3',
				marginTop: 1.5,
				cursor: 'pointer',
				width: 'fit-content',
				'&:hover': {
					' -webkit-transform': 'scale(1.03)',
					'-ms-transform': 'scale(1.03)',
					'  transform': 'scale(1.03)',
				},
			}}
		>
			<Typography sx={{ fontSize: '17px' }}>{title}</Typography>
		</Box>
	)
}

export default SuggestedMessage
