import React from 'react'
import { Box, Tooltip, Typography } from '@mui/material'

import { useAppSelector } from '@/src/main/store/store'

interface ITooltip {
	title: string
	description: string
	advantages: string
	children: React.ReactNode
	warning?: string
}

const TooltipModelTypes: React.FC<ITooltip> = ({ description, advantages, title, children, warning }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Tooltip
			placement='left'
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
						bgcolor: theme === 'light' ? 'white' : '#4B4B4B',
						borderRadius: '10px',
						'& .MuiTooltip-arrow': {
							color: theme === 'light' ? 'white' : '#4B4B4B',
						},
						boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 32px rgba(0, 0, 0, 0.16)',
					},
				},
			}}
			title={
				<Box sx={{ p: 1, width: '240px' }}>
					<Typography
						sx={{
							fontSize: '17px',
							color: theme === 'light' ? '#666666' : '#CFCFCF',
							fontWeight: '600',
						}}
					>
						{title}
					</Typography>
					<Typography
						sx={{
							fontSize: '14px',
							width: '200px',
							color: '#868686',
							marginTop: 1,
						}}
					>
						{description}
					</Typography>
					{advantages && (
						<Typography
							sx={{
								fontSize: '17px',
								color: theme === 'light' ? '#666666' : '#CFCFCF',
								marginTop: 1,
								fontWeight: '600',
							}}
						>
							Преимущества
						</Typography>
					)}
					<Typography
						sx={{
							fontSize: '14px',
							width: '200px',
							color: '#868686',
							marginTop: 1,
						}}
					>
						{advantages}
					</Typography>
					{warning && (
						<Box
							sx={{
								borderLeft: '2px solid #FF5555',
								marginTop: 2,
								paddingLeft: 2,
								color: '#FF5555',
							}}
						>
							<Typography
								sx={{
									fontSize: '16px',
									fontWeight: '600',
								}}
							>
								Внимание!
							</Typography>
							<Typography sx={{ fontSize: '14px' }}>{warning}</Typography>
						</Box>
					)}
				</Box>
			}
			arrow
		>
			<span>{children}</span>
		</Tooltip>
	)
}

export default TooltipModelTypes
