import React, { memo } from 'react'
import { Box, Tooltip } from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

import { useCalculating } from '@/src/features/calculation-tokens-gpt/model/use-calculating'
import TooltipCalculating from '@/src/features/calculation-tokens-gpt/ui/tooltip-calculating'
import { useAppSelector } from '@/src/main/store/store'
import { baseColor } from '@/src/shared/lib/constants/colors'
import { ImessageContext } from '@/src/shared/lib/types/types-gpt'
import { TypeModelGPT } from '@/src/widgets/filters-gpt/lib/constants'

interface ICalculationTokenProps {
	model: 'gpt' | 'sd' | 'dalle'
	quality?: string
	count?: number
	prompt?: string
	isAdditional?: boolean
	gptType?: TypeModelGPT
	context?: ImessageContext[]
}

export const Calculation: React.FC<ICalculationTokenProps> = memo(({ prompt, gptType, context, isAdditional, count, quality, model }) => {
	const price = useCalculating(model, count, quality, prompt, gptType, isAdditional, context)

	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Tooltip
			placement='top'
			title={<TooltipCalculating model={model} />}
			componentsProps={{
				tooltip: {
					sx: {
						'&.MuiTooltip-tooltip': {
							'&.MuiTooltip-tooltipPlacementBottom': {
								marginTop: '2px',
							},
							'&.MuiTooltip-tooltipPlacementTop': {
								marginBottom: '7px',
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
			arrow
		>
			<Box
				className='tutorial-calc'
				sx={{
					marginLeft: '0px',
					cursor: 'pointer',
					backgroundColor: 'rgba(127, 125, 243, 0.1) !important',
					padding: '5px 10px !important',
					borderRadius: '12px',
					textAlign: 'center',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					overflow: 'hidden',
				}}
			>
				<Image src={'/token.svg'} width={16} height={16} alt={''} />
				<Typography
					sx={{
						fontSize: '14px',
						fontWeight: 600,
						color: baseColor,
						whiteSpace: 'nowrap',
						marginLeft: 0.5,
					}}
				>
					{price}
				</Typography>
			</Box>
		</Tooltip>
	)
})

Calculation.displayName = 'Calculation'
