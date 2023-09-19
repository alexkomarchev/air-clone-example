import React from 'react'
import { Alert, Slide, Snackbar, Typography } from '@mui/material'
import Image from 'next/image'

import { useThemeAndDevice } from '@/src/shared/lib/hooks'

interface ISuccess {
	message: string
	open: boolean
	handleClose?: () => void
}
export const Success: React.FC<ISuccess> = ({ message, handleClose, open }) => {
	const { theme } = useThemeAndDevice()

	return (
		<Slide direction='down' in={open} mountOnEnter unmountOnExit>
			<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					iconMapping={{
						success: <Image src={'/svg/alert/success.svg'} style={{ marginTop: 3 }} width={20} alt={''} height={20} />,
					}}
					severity='success'
					sx={{
						backgroundColor: theme === 'light' ? 'white' : '#294239',
						border: '2px solid #22B47F',
						color: theme === 'light' ? '#666666' : '#C7C7C7',
						borderRadius: '12px',
					}}
				>
					<Typography sx={{ fontSize: '17px' }}>{message}</Typography>
				</Alert>
			</Snackbar>
		</Slide>
	)
}
