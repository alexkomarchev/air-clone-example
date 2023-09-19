import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'

import { textTooltipCalculating } from '@/src/features/calculation-tokens-gpt/lib/constants'
import { useAppSelector } from '@/src/main/store/store'

const TooltipCalculating = ({ model = 'dalle' }: { model?: 'gpt' | 'dalle' | 'sd' }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Box p={1}>
			<Typography
				sx={{
					fontSize: '14px',
					color: theme === 'light' ? '#666666' : '#CFCFCF',
				}}
			>
				{textTooltipCalculating}
			</Typography>

			{model === 'gpt' && (
				<Box
					sx={{
						borderLeft: '2px solid #FF5555',
						marginTop: 1.3,
						paddingLeft: 1,
						color: '#FF5555',
						marginBottom: 0.8,
					}}
				>
					<Typography sx={{ fontSize: '14px' }}>Фактическое значение может немного отличаться</Typography>
				</Box>
			)}
		</Box>
	)
}

export default TooltipCalculating
