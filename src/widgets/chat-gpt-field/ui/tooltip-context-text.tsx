import React from 'react'
import { Box, Typography } from '@mui/material'

import { errorColor } from '@/src/shared/lib/constants/colors'
import { useThemeAndDevice } from '@/src/shared/lib/hooks'

const TooltipContextText = () => {
	const { theme } = useThemeAndDevice()

	return (
		<Box>
			<Typography
				sx={{
					color: theme === 'light' ? '#5B5B5B' : 'white',
					fontSize: '15px',
					fontWeight: 600,
				}}
			>
				Запоминание контекста
			</Typography>
			<Typography
				sx={{
					color: theme === 'light' ? '#5B5B5B' : 'white',
					fontSize: '14px',
					marginTop: 1,
				}}
			>
				Кликните на ваше сообщение, чтобы добавить его к новому запросу
			</Typography>
			<Typography
				sx={{
					color: errorColor,
					marginTop: 1,
					fontSize: '14px',
					borderLeft: `2px solid ${errorColor}`,
					padding: '2px 8px',
				}}
			>
				Тратит больше токенов
			</Typography>
		</Box>
	)
}

export default TooltipContextText
