import React from 'react'
import { Box, Button, Grow, Menu, Typography } from '@mui/material'

import { useAppSelector } from '@/src/main/store/store'
import { ImessageContext } from '@/src/shared/lib/types/types-gpt'

interface IContext {
	context: ImessageContext[] | []
	deleteContextMessage: (start_time: string) => void
	deleteAllContextMessage: () => void
	device?: 'mobile' | 'desktop'
}

const Context: React.FC<IContext> = ({ context, deleteContextMessage, deleteAllContextMessage, device = 'desktop' }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const theme = useAppSelector((state) => state.theme.theme)

	return device ? (
		<>
			{context.length !== 0 && (
				<Button
					onClick={handleClick}
					sx={{
						padding: '0px',
						borderRadius: '50%',
						cursor: 'pointer',
						backgroundColor: 'transparent',
						border: '1px solid #7F7DF3',
						color: '#7F7DF3',
						fontSize: '17px',
						height: '28px',
						minWidth: '28px',
						marginRight: 1,
					}}
				>
					{context.length}
				</Button>
			)}
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				sx={{ maxHeight: '500px' }}
				PaperProps={{
					style: {
						backgroundColor: theme === 'light' ? '' : '#3D3D3D',
						transform: 'translateX(-4%) translateY(-58%)',
						borderRadius: 15,
						width: '330px',
					},
				}}
			>
				<Typography
					onClick={deleteAllContextMessage}
					sx={{
						color: '#FF4170',
						fontSize: '14px',
						margin: 2,
						cursor: 'pointer',
					}}
				>
					Удалить все
				</Typography>
				{context.map((message) => {
					return (
						<Typography
							onClick={() => deleteContextMessage(message.start_time)}
							key={message.start_time}
							sx={{
								color: '#7F7DF3',
								border: '1px solid #7F7DF3',
								padding: '4px 12px',
								margin: 1,
								marginLeft: 2,
								borderRadius: '10px',
								cursor: 'pointer',
								fontSize: 16,
								textAlign: 'center',
								width: 'fit-content',
								whiteSpace: 'nowrap',
								maxWidth: '300px',
								overflow: 'hidden',
							}}
						>
							{message.question}
						</Typography>
					)
				})}
			</Menu>
		</>
	) : (
		<>
			{context.map((message) => {
				return (
					<Grow key={message.start_time} in={true} style={{ transformOrigin: '0 0 0' }} {...(true ? { timeout: 800 } : {})}>
						<Box onClick={() => deleteContextMessage(message.start_time)} sx={{ width: 'fit-content' }}>
							<Typography
								sx={{
									color: '#7F7DF3',
									border: '1px solid #7F7DF3',
									padding: '8px 12px',
									marginLeft: 1,
									marginRight: 1,
									borderRadius: '10px',
									cursor: 'pointer',
									fontSize: 16,
									textAlign: 'center',
									width: 'fit-content',
									whiteSpace: 'nowrap',
									maxWidth: '300px',
									overflow: 'hidden',
								}}
							>
								{message.question}
							</Typography>
						</Box>
					</Grow>
				)
			})}
		</>
	)
}

export default Context
