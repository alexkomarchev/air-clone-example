import React from 'react'
import { Tooltip } from '@mui/material'

import { useThemeAndDevice } from '@/src/shared/lib/hooks'
import TooltipContextText from '@/src/widgets/chat-gpt-field/ui/tooltip-context-text'

interface ITooltipContext {
	children: React.ReactNode
}

const TooltipContext: React.FC<ITooltipContext> = ({ children }) => {
	const { theme } = useThemeAndDevice()

	return (
		<Tooltip
			placement='bottom'
			title={<TooltipContextText />}
			sx={{
				width: 'fit-content',
				marginLeft: 'auto',
				maxWidth: '80%',
			}}
			componentsProps={{
				tooltip: {
					sx: {
						'&.MuiTooltip-tooltip': {
							'&.MuiTooltip-tooltipPlacementBottom': {
								marginTop: '8px',
							},
							'&.MuiTooltip-tooltipPlacementTop': {
								marginBottom: '2px',
							},
							'&.MuiTooltip-tooltipPlacementLeft': {
								marginRight: '24px',
							},
						},
						bgcolor: theme === 'light' ? 'white' : '#4B4B4B',
						borderRadius: '10px',
						'& .MuiTooltip-arrow': {
							color: theme === 'light' ? 'white' : '#4B4B4B',
						},
						padding: '15px 20px',
						boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 32px rgba(0, 0, 0, 0.16)',
					},
				},
			}}
			arrow
		>
			<span>{children}</span>
		</Tooltip>
	)
}

export default TooltipContext
