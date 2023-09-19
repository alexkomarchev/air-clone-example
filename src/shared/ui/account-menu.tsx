import * as React from 'react'
import { Box, Divider, Link, Menu, MenuItem, Typography } from '@mui/material'
import Router from 'next/router'
import { signOut, useSession } from 'next-auth/react'

import { useAppSelector } from '@/src/main/store/store'

interface IAccountMenu {
	anchorEl: HTMLElement | null
	changeVisible: () => void
	device?: 'mobile' | 'desktop'
}

export const AccountMenu: React.FC<IAccountMenu> = ({ anchorEl, changeVisible, device = 'desktop' }) => {
	const { data } = useSession()
	const goAccount = async () => {
		await Router.push('/account')
	}

	const open = Boolean(anchorEl)

	const theme = useAppSelector((state) => state.theme.theme)

	const desktop = device === 'desktop'

	return (
		<Menu
			id='basic-menu'
			anchorEl={anchorEl}
			open={open}
			onClose={() => changeVisible()}
			PaperProps={{
				style: {
					transform: desktop ? 'translateX(-9%) translateY(28%)' : 'translateX(0%) translateY(16%)',
					borderRadius: desktop ? 10 : '0px 0px 15px 15px',
					marginTop: desktop ? 0 : 12,
				},
				elevation: 0,
				sx: {
					filter: 'drop-shadow(10px 10px 10px rgba(0,0,0,0.3))',
					width: desktop ? 'auto' : '100vw',
					zIndex: 10,
					backgroundColor: theme === 'light' ? 'white' : '#2C2C2C',
				},
			}}
			MenuListProps={{ 'aria-labelledby': 'basic-button' }}
			transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
		>
			<Box>
				<Typography
					variant='body2'
					sx={{
						color: '#7F7DF3',
						lineHeight: '18.2px',
						fontSize: '16px',
						fontWeight: '400',
						marginLeft: 2,
						marginBottom: 0.6,
					}}
				>
					{data?.user?.name}
				</Typography>
				<Typography
					variant='body2'
					sx={{
						color: '#868686',
						lineHeight: '23.8px',
						fontSize: '16px',
						fontWeight: '600px',
						marginLeft: 2,
						overflow: 'hidden',
						marginRight: 2,
						marginBottom: 1,
					}}
				>
					{data?.user?.email!.slice(0, 20)}
				</Typography>
				<Divider variant='middle' sx={{ marginBottom: 1 }} />
				{desktop ? (
					<>
						<MenuItem
							onClick={goAccount}
							sx={{
								color: '#868686',
								lineHeight: '19.6px',
								fontSize: '14px',
								fontWeight: '400',
							}}
						>
							Личный кабинет
						</MenuItem>
						<MenuItem
							onClick={goAccount}
							sx={{
								color: '#868686',
								lineHeight: '19.6px',
								fontSize: '14px',
								fontWeight: '400',
							}}
						>
							Оплата и подписка
						</MenuItem>
						<MenuItem
							sx={{
								color: '#868686',
								lineHeight: '19.6px',
								fontSize: '14px',
								fontWeight: '400',
							}}
						>
							<Link target='_blank' href='https://air.fail/blog' underline='none' sx={{ color: '#868686' }}>
								Блог
							</Link>
						</MenuItem>
						<MenuItem
							onClick={() => signOut()}
							sx={{
								color: '#FF4170',
								lineHeight: '19.6px',
								fontSize: '14px',
								fontWeight: '400',
							}}
						>
							Выход
						</MenuItem>
					</>
				) : (
					<>
						<Typography
							onClick={goAccount}
							sx={{
								color: '#868686',
								lineHeight: '19.6px',
								fontSize: '15px',
								marginBottom: 0.3,
								fontWeight: '400',
								marginLeft: 2,
								marginTop: 1.2,
							}}
						>
							Личный кабинет
						</Typography>
						<Typography
							onClick={goAccount}
							sx={{
								color: '#868686',
								lineHeight: '19.6px',
								fontSize: '15px',
								marginBottom: 0.3,
								fontWeight: '400',
								marginLeft: 2,
								marginTop: 1.2,
							}}
						>
							Оплата
						</Typography>
						<Typography
							sx={{
								color: '#868686',
								lineHeight: '19.6px',
								fontSize: '15px',
								marginBottom: 0.3,
								fontWeight: '400',
								marginLeft: 2,
								marginTop: 1.2,
							}}
						>
							<Link target='_blank' href='https://air.fail/blog' underline='none' sx={{ color: '#868686' }}>
								Блог
							</Link>
						</Typography>
						<Typography
							onClick={() => signOut()}
							sx={{
								color: '#FF4170',
								lineHeight: '19.6px',
								fontSize: '15px',
								marginBottom: 0.3,
								fontWeight: '400',
								marginLeft: 2,
								marginTop: 1.2,
							}}
						>
							Выход
						</Typography>
					</>
				)}
			</Box>
		</Menu>
	)
}
