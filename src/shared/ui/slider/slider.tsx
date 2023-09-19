import React from 'react'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

import { useAppSelector } from '@/src/main/store/store'
import { PrettoSlider, PrettoSliderDark } from '@/src/widgets/filters-gpt/ui/filters'

export const Slider = ({
	value,
	title,
	onChange,
	min,
	max,
	step,
}: {
	value: number | number[] | undefined
	title: string
	onChange: (event: Event, value: number | number[], activeThumb: number) => void
	min: number
	max: number
	step: number
}) => {
	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Box sx={{ marginTop: 0.5 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography
					sx={{
						color: '#868686',
						fontSize: '14px',
						fontWeight: '600px',
						marginBottom: 0.5,
						marginLeft: 0.5,
					}}
				>
					{title}
				</Typography>
				<Typography
					sx={{
						color: '#868686',
						fontSize: '15px',
						fontWeight: '600',
						marginBottom: 0.5,
						marginLeft: 1,
					}}
				>
					{value}
				</Typography>
			</Box>

			<Box sx={{ marginLeft: 1 }}>
				{theme === 'light' ? (
					<PrettoSlider
						style={{ width: '100%' }}
						value={value}
						onChange={onChange}
						max={max}
						min={min}
						step={step}
						aria-label='pretto slider'
					/>
				) : (
					<PrettoSliderDark
						style={{ width: '100%' }}
						value={value}
						onChange={onChange}
						max={max}
						min={min}
						step={step}
						aria-label='pretto slider'
					/>
				)}
			</Box>
		</Box>
	)
}
