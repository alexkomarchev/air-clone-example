import React from 'react'
import { styled } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { create } from '@mui/material/styles/createTransitions'
import Switch, { SwitchProps } from '@mui/material/Switch'

import { useAppSelector } from '@/src/main/store/store'
import { baseColor } from '@/src/shared/lib/constants/colors'
import { pingFangFont } from '@/src/shared/lib/constants/font/font'

const AntSwitch = styled(Switch)(({ theme }) => ({
	width: 29,
	height: 17,
	padding: 0,
	display: 'flex',
	'&:active': {
		'& .MuiSwitch-thumb': {
			width: 17,
		},
		'& .MuiSwitch-switchBase.Mui-checked': {
			transform: 'translateX(9px)',
		},
	},
	'& .MuiSwitch-switchBase': {
		padding: 2.4,
		'&.Mui-checked': {
			transform: 'translateX(12px)',
			color: 'white',
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : baseColor,
			},
		},
	},
	'& .MuiSwitch-thumb': {
		boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
		width: 12,
		height: 12,
		borderRadius: 6,
		transition: theme.transitions.create(['width'], {
			duration: 200,
		}),
	},
	'& .MuiSwitch-track': {
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : '#D4D4D4',
		boxSizing: 'border-box',
	},
}))
export const SwitchCustom = (props: any) => {
	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<AntSwitch
			sx={{
				'& .MuiSwitch-track': {
					borderRadius: 16 / 2,
					opacity: 1,
					backgroundColor: theme !== 'dark' ? '#E6E6E6' : '#666666',
					boxSizing: 'border-box',
				},
			}}
			{...props}
			defaultChecked
			inputProps={{ 'aria-label': 'ant design' }}
		/>
	)
}
