import React from 'react'
import { Alert, Slide, Snackbar, Typography } from '@mui/material'
import Image from 'next/image'

import { useThemeAndDevice } from '@/src/shared/lib/hooks'

export interface IError {
	error: string
	open: boolean
	handleClose?: () => void
}

const ErrorIcon = () => {
	const { theme } = useThemeAndDevice()

	return <Image src={`/error2${theme === 'light' ? '_white' : ''}.svg`} alt={''} width={20} height={20} style={{ marginTop: 2.5 }} />
}

export const Error: React.FC<IError> = ({ error, handleClose, open }) => {
	const { theme } = useThemeAndDevice()

	return (
		<Slide direction='down' in={open} mountOnEnter unmountOnExit>
			<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					icon={<ErrorIcon />}
					severity='error'
					sx={{
						backgroundColor: theme === 'light' ? 'white' : '#404040',
						border: '1px solid #F15179',
						color: theme === 'light' ? '#666666' : '#C7C7C7',
						borderRadius: '12px',
					}}
				>
					<Typography sx={{ fontSize: '17px' }}>{error}</Typography>
				</Alert>
			</Snackbar>
		</Slide>
	)
}
