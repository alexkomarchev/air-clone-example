import React, { memo } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Button, Divider, MenuItem } from '@mui/material'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import { Box, Stack } from '@mui/system'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { change } from '@/src/entities/theme'
import { useAppDispatch, useAppSelector } from '@/src/main/store/store'
import { AccountMenu } from '@/src/shared'

export const MainMenuMobile = memo(() => {
	const { data, status } = useSession()

	const dispatch = useAppDispatch()

	const { pathname } = useRouter()
	const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const goToMain = async () => {
		await Router.push('/')
	}

	const goToReportPage = async () => {
		await Router.push('/reports-mobile')
	}

	const [anchorElAccount, setAnchorElAccount] = React.useState<HTMLElement | null>(null)

	const closeMenuAccount = () => setAnchorElAccount(null)

	const openMenuAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElAccount(event.currentTarget)
	}

	const closeMenu = () => {
		setAnchorEl(null)
	}

	const login = () => {
		closeMenu()
		Router.push('/login')
	}

	const register = async () => {
		closeMenu()
		await Router.push('/register')
	}

	const theme = useAppSelector((state) => state.theme.theme)

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const [anchorElNavigate, setAnchorElNavigate] = React.useState<null | HTMLElement>(null)
	const openMenuNavigate = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElNavigate(event.currentTarget)
	}

	const closeMenuNavigate = () => {
		setAnchorElNavigate(null)
	}

	const selectPage = pathname === '/' ? 0 : 1

	return (
		<Box
			sx={{
				backgroundColor: theme === 'light' ? 'white' : '',
				padding: '7px 0',
			}}
		>
			<Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between'>
				<Button onClick={openMenuNavigate} sx={{ paddingLeft: 0 }}>
					<MenuIcon
						sx={{
							color: '#868686',
							marginRight: '28px',
							width: 30,
						}}
					/>
				</Button>
				<Menu
					open={Boolean(anchorElNavigate)}
					onClose={closeMenuNavigate}
					onClick={closeMenuNavigate}
					anchorEl={anchorElNavigate}
					PaperProps={{
						elevation: 0,
						sx: {
							width: '100vw',
							zIndex: 10,
							backgroundColor: theme === 'light' ? 'white' : '#4B4B4B',
							position: 'relative',
							overflow: 'visible',
							mt: 1.2,
							borderRadius: '0px 0px 15px 15px',
							filter: 'drop-shadow(10px 10px 10px rgba(0,0,0,0.3))',
						},
					}}
				>
					<MenuItem onClick={goToMain}>
						<Image
							height={18}
							width={18}
							src={pathname == '/' ? '/svg/main_menu/marketplace.svg' : '/svg/main_menu/marketplace_off.svg'}
							alt={''}
						/>
						<Typography
							sx={{
								fontSize: 16,
								marginLeft: 2,
								color: selectPage === 0 ? '#7F7DF3' : '#868686',
							}}
						>
							Маркетплейс
						</Typography>
					</MenuItem>
					<Divider variant='middle' sx={{ marginBottom: 1 }} />
					<MenuItem onClick={goToReportPage}>
						<Image height={19} width={19} src={pathname == '/reportsMobile' ? '/error.svg' : '/error_off.svg'} alt={''} />
						<Typography
							sx={{
								fontSize: 16,
								marginLeft: 2,
								color: '#868686',
							}}
						>
							Сообщить об ошибке
						</Typography>
					</MenuItem>
					<MenuItem onClick={() => dispatch(change(null))}>
						<Image height={19} width={19} src={'/sleep.svg'} alt={''} />
						<Typography
							sx={{
								fontSize: 16,
								marginLeft: 2,
								color: '#868686',
							}}
						>
							{theme === 'light' ? 'Тёмная' : 'Светлая'} версия
						</Typography>
					</MenuItem>
				</Menu>
				<Image onClick={goToMain} priority src='/logo.svg' height={26} width={31} alt='Error' />
				<Stack direction='row' spacing={1}>
					{status === 'authenticated' ? (
						<>
							<Button id='basic-button' aria-haspopup='true' onClick={openMenu}>
								<Avatar
									sx={{
										width: 30,
										height: 30,
										marginRight: 1,
									}}
								>
									{
										/* @ts-ignore */
										data?.user?.email[0]
									}
								</Avatar>
								<Image priority src='/arrow.svg' height={8} width={6} alt='Bell' />
							</Button>
							<AccountMenu device={'mobile'} anchorEl={anchorEl} changeVisible={closeMenu} />
						</>
					) : (
						<Stack>
							<Button onClick={openMenuAccount}>
								<Avatar
									sx={{
										width: '35px',
										height: '35px',
									}}
									src={'/account/profile.svg'}
								/>
							</Button>

							<Menu
								onClose={closeMenuAccount}
								onClick={closeMenuAccount}
								open={Boolean(anchorElAccount)}
								PaperProps={{
									elevation: 0,
									sx: {
										backgroundColor: theme === 'light' ? 'white' : '#4B4B4B',
										width: '100vw',
										position: 'relative',
										overflow: 'visible',
										mt: 6.1,
										borderRadius: '5px 5px 15px 15px',
										filter: 'drop-shadow(10px 10px 10px rgba(0,0,0,0.3))',
										'& .MuiAvatar-root': {
											width: 32,
											height: 32,
											ml: -0.5,
											mr: 1,
										},
									},
								}}
								transformOrigin={{
									horizontal: 'right',
									vertical: 'top',
								}}
								anchorOrigin={{
									horizontal: 'right',
									vertical: 'top',
								}}
							>
								<MenuItem
									onClick={() => login()}
									sx={{
										padding: 1.5,
										fontSize: 17,
										color: '#868686',
										textTransform: 'none',
										'&:hover': {
											backgroundColor: 'rgba(90, 90, 90, 0.1)',
										},
									}}
								>
									Вход
								</MenuItem>
								<MenuItem
									onClick={() => register()}
									sx={{
										padding: 1.5,
										fontSize: 17,
										color: '#868686',
										textTransform: 'none',
										'&:hover': {
											backgroundColor: 'rgba(90, 90, 90, 0.1)',
										},
									}}
								>
									Регистрация
								</MenuItem>
							</Menu>
						</Stack>
					)}
				</Stack>
			</Stack>
		</Box>
	)
})

MainMenuMobile.displayName = 'MainMenuMobile'
