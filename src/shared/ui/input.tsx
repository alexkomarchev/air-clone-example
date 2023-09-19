import React from 'react'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField/TextField'

import { baseColor } from '@/src/shared/lib/constants/colors'
import { useThemeAndDevice } from '@/src/shared/lib/hooks'

export const styleInputWithoutBorderFocus = {
	'& .MuiOutlinedInput-root:hover': {
		'& > fieldset': {
			borderColor: baseColor,
		},
	},
	'& .MuiOutlinedInput-root:not(:hover)': {
		'& > fieldset': {
			borderColor: 'none',
		},
	},
}

export const InputStyleLight = {
	borderRadius: '15px',
	marginTop: 0,
	paddingTop: 0,
	paddingBottom: 0,
	...styleInputWithoutBorderFocus,
	'& label': { color: '#8853FA' },
	backgroundColor: 'transparent',
	input: { color: '#272727' },
	fieldset: {
		borderRadius: '15px',
		border: '1px solid #E1E1E1',
	},
}

export const InputStyleDark = {
	...InputStyleLight,
	backgroundColor: '#4B4B4B',
	input: { color: '#E1E1E1' },
	fieldset: {
		borderRadius: '15px',
		border: 'none',
	},
}

type FormStateProps = {
	name?: string
	option?: RegisterOptions
}
export const Input = (props: TextFieldProps & FormStateProps) => {
	const { theme } = useThemeAndDevice()

	return <TextField fullWidth sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }} {...props} />
}
