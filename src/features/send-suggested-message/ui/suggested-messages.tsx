import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

import { suggestedMessagesList } from '@/src/features/send-suggested-message/lib/constants'
import SuggestedMessage from '@/src/features/send-suggested-message/ui/suggested-message'
import { useThemeAndDevice } from '@/src/shared/lib/hooks'

interface IProps {
	device: 'mobile' | 'desktop'
	sendMessage?: (title: string) => void
}

export const SuggestedMessages: React.FC<IProps> = ({ device, sendMessage }) => {
	const { theme, desktop } = useThemeAndDevice(device)

	return (
		<Box
			sx={{
				margin: '50px auto',
				width: desktop ? '30%' : '90%',
				textAlign: 'center',
				color: theme === 'light' ? '#5E5E5E' : '#A6A5A5',
			}}
		>
			<Typography sx={{ fontSize: '16px' }}> Не знаете с чего начать?</Typography>
			<Typography sx={{ fontSize: '16px', marginBottom: 2 }}>Попробуйте, например, вот так: </Typography>
			<Stack alignItems='center'>
				{suggestedMessagesList.map((messages) => {
					return <SuggestedMessage sendMessage={sendMessage} key={messages} title={messages} />
				})}
			</Stack>
		</Box>
	)
}
