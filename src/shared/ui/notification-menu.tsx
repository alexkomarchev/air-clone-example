import * as React from 'react'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'

import { useAppSelector } from '@/src/main/store/store'

interface INotificationMenu {
	anchorEl: null | HTMLElement
	open: boolean
	closeMenu: () => void
}

export const NotificationMenu: React.FC<INotificationMenu> = ({ closeMenu, open, anchorEl }) => {
	const theme = useAppSelector((state) => state.theme.theme)
	return (
		<Menu
			id='notification-menu'
			anchorEl={anchorEl}
			open={open}
			onClose={() => closeMenu()}
			MenuListProps={{ 'aria-labelledby': 'notification-button' }}
			PaperProps={{
				elevation: 0,
				sx: {
					backgroundColor: theme === 'light' ? 'white' : '#2B2828',
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1,
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1,
					},
					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 0,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: theme === 'light' ? 'white' : '#2B2828',
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0,
					},
				},
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
		>
			<Typography
				variant='body2'
				sx={{
					color: '#868686',
					lineHeight: '18.2px',
					fontSize: '13px',
					fontWeight: '600px',
					margin: '10px 14px',
					marginBottom: 1,
				}}
			>
				Нет уведомлений
			</Typography>
		</Menu>
	)
}
