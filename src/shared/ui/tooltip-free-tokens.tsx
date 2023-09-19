import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Alert, Collapse, IconButton } from '@mui/material'
import Link from 'next/link'

export const TooltipFreeTokens = () => {
	const [open, setOpen] = React.useState(() => {
		if (typeof window !== 'undefined') {
			if (sessionStorage.getItem('free-token') === null) {
				return true
			}

			if (JSON.parse(sessionStorage.getItem('free-token') as string) === false) {
				return false
			}

			return true
		}
	})

	useEffect(() => {
		if (open) {
			setOpen(false)
			setTimeout(() => setOpen(true), 50)
		}
	}, [])

	return (
		<Collapse
			in={open}
			sx={{
				position: 'absolute',
				right: 20,
				top: 78,
				zIndex: 99,
				cursor: 'pointer',
			}}
		>
			<Link href={'/register'}>
				<Alert
					icon={false}
					style={{
						background: 'linear-gradient(91.87deg, #7F7DF3 0%, #D372A1 95.23%)',
						color: 'white',
						borderRadius: '10px',
						padding: '7px 16px',
					}}
					action={
						<IconButton
							aria-label='close'
							color='inherit'
							size='small'
							onClick={() => {
								sessionStorage.setItem('free-token', JSON.stringify(false))
								setOpen(false)
							}}
						>
							<CloseIcon fontSize='inherit' />
						</IconButton>
					}
					sx={{ mb: 2 }}
				>
					Получите бесплатные токены за регистрацию!
				</Alert>
			</Link>
		</Collapse>
	)
}
