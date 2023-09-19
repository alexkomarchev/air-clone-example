import { createTheme } from '@mui/material/styles'
import { deDE } from '@mui/x-date-pickers/locales'

export const pingFangFont = createTheme(
	{
		typography: {
			fontSize: 17,
			fontFamily: 'inherit',
			fontWeightLight: '500',
		},
	},
	deDE
)
