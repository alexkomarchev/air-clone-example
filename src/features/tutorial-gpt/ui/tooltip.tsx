import React from 'react'
import { Box, Tooltip, Typography } from '@mui/material'

import { useAppSelector } from '@/src/main/store/store'
import { baseColor } from '@/src/shared/lib/constants/colors'

interface ITooltipMy {
	begin: () => void
	children: React.ReactNode
}

interface ITooltiptext {
	begin: () => void
}
const TooltipText: React.FC<ITooltiptext> = ({ begin }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Box>
			<Typography
				sx={{
					color: theme === 'light' ? '#5E5E5E' : '#CFCFCF',
					fontSize: '16px',
				}}
			>
				Как работать с ChatGPT
			</Typography>
			<Typography
				sx={{
					color: theme === 'light' ? '#5E5E5E' : '#A6A5A5',
					fontSize: '15px',
					marginTop: 1,
				}}
			>
				Научитесь работать с ChatGPT за 7 простых шагов!
			</Typography>
			<Typography
				onClick={begin}
				sx={{
					color: baseColor,
					fontSize: '15px',
					marginTop: 1,
					cursor: 'pointer',
				}}
			>
				Начать обучение
			</Typography>
		</Box>
	)
}
const TooltipMy: React.FC<ITooltipMy> = ({ children, begin }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Tooltip
			arrow
			placement='bottom'
			title={<TooltipText begin={begin} />}
			componentsProps={{
				tooltip: {
					sx: {
						'&.MuiTooltip-tooltip': {
							'&.MuiTooltip-tooltipPlacementBottom': {
								marginTop: '2px',
							},
							'&.MuiTooltip-tooltipPlacementTop': {
								marginBottom: '2px',
							},
							'&.MuiTooltip-tooltipPlacementLeft': {
								marginRight: '24px',
							},
						},
						bgcolor: theme === 'light' ? 'white' : '#2B2828',
						borderRadius: '10px',
						'& .MuiTooltip-arrow': {
							color: theme === 'light' ? 'white' : '#2B2828',
						},
						padding: '15px 20px',
						boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 32px rgba(0, 0, 0, 0.16)',
					},
				},
			}}
		>
			<span>{children}</span>
		</Tooltip>
	)
}

export default TooltipMy
