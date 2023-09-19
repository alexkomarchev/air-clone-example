import * as React from 'react'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { CSSObject, styled, Theme } from '@mui/material/styles'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

import { change } from '@/src/entities/theme'
import { useAppDispatch, useAppSelector } from '@/src/main/store/store'
import { Balance, SwitchCustom, TooltipCustom } from '@/src/shared'

import styles from '../styles/styles.module.css'

const drawerWidth = 260

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 0),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}))

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}))

export const SideMenu = () => {
	const [open, setOpen] = React.useState(false)

	const { data, status } = useSession()

	const { pathname, push } = useRouter()

	const isPlayground = pathname === '/chatgpt' || pathname === '/dalle' || pathname === '/stable-diffusion' || pathname === '/whisper'

	const dispatch = useAppDispatch()

	const theme = useAppSelector((state) => state.theme.theme)

	const userType = useAppSelector((state) => state.user.type)
	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const ErrorModalLazy = dynamic(() => import('@/src/shared/ui/error-modal'), { ssr: false })

	const [openErrorModal, setOpenErrorModal] = React.useState(false)

	const handleOpenErrorModal = () => setOpenErrorModal(true)

	const handleCloseErrorModal = () => setOpenErrorModal(false)

	const match = useMediaQuery('(min-height:800px)')

	const match2 = useMediaQuery('(min-height:750px)')

	const balance = useAppSelector((state) => state.balance.balance)

	return (
		<Drawer
			className={styles.drawer}
			PaperProps={{ sx: { backgroundColor: theme === 'light' ? 'white' : '#373737' } }}
			variant='permanent'
			open={open}
		>
			<DrawerHeader
				sx={{
					display: 'flex',
					flexDirection: 'column',
					padding: '17px 0px 0px',
					height: match ? '12vh' : '17vh',
					justifyContent: 'start',
				}}
			>
				{open ? (
					<>
						<Box width='95%' display={'flex'} alignItems={'center'} justifyContent='space-between'>
							<Image style={{ cursor: 'pointer', marginLeft: 20 }} priority src='/logo.svg' height={26} width={31} alt='Error' />
							<Button onClick={handleDrawerClose}>
								<Image src={'/arrow-left.svg'} width={20} height={15} alt={' '} />
							</Button>
						</Box>
					</>
				) : (
					<Button onClick={handleDrawerOpen}>
						<Image src={'/burger-menu.svg'} width={16} height={16} alt={' '} />
					</Button>
				)}
				<Box
					onClick={handleDrawerOpen}
					display='flex'
					alignItems='center'
					justifyContent={open ? 'start' : 'center'}
					sx={{
						cursor: 'pointer',
						marginTop: 1.2,
						overflow: 'hidden',
						width: '220px',
						padding: '6px 12px',
						borderRadius: '13px',
						backgroundColor: status === 'authenticated' ? (theme === 'light' ? '#FBFBFB' : '#303030') : 'transparent',
						border:
							status === 'authenticated'
								? theme === 'light'
									? '1px solid #F5F5F5'
									: '1px solid #202020'
								: '1px solid transparent',
					}}
				>
					{(status === 'authenticated' || (status === 'unauthenticated' && !open)) && (
						<Image src={'/svg/side-menu/profile.svg'} width={30} height={30} alt={''} />
					)}
					{open && (
						<>
							{status === 'authenticated' ? (
								<Box sx={{ marginLeft: 1 }}>
									<Typography sx={{ fontSize: 16, color: theme === 'light' ? '#373737' : '#D4D4D4' }}>
										{data?.user?.email}
									</Typography>
									<Balance balance={balance} />
								</Box>
							) : (
								<Box>
									<Button
										onClick={() => Router.push('/login')}
										sx={{
											fontSize: 16,
											padding: '5px 10px',
											borderRadius: '12px',
											color: theme === 'light' ? '#373737' : '#D0D0D0',
											textTransform: 'none',
											backgroundColor: theme === 'light' ? 'white' : '#303030',
											border: '1px solid #D4D4D4',
											'&:hover': {
												backgroundColor: 'rgba(90, 90, 90, 0.1)',
											},
										}}
									>
										Вход
									</Button>
									<Button
										style={{
											backgroundColor: 'transparent',
										}}
										onClick={() => Router.push('/register')}
										sx={{
											fontSize: 16,
											marginLeft: 1,
											border: '1px solid #7F7DF3',
											padding: '5px 12px',
											borderRadius: '10px',
											color: '#7F7DF3',
											textTransform: 'none',
											'&:hover': {
												backgroundColor: '#E8E8FA',
											},
										}}
									>
										Регистрация
									</Button>
								</Box>
							)}
						</>
					)}
				</Box>
			</DrawerHeader>
			{status === 'authenticated' && (
				<>
					<List>
						<TooltipCustom placement='right' title='Аккаунт'>
							<Link href={'/account'}>
								<ListItem
									disablePadding
									sx={{
										padding: '0px',
										display: 'block',
										borderLeft: pathname === '/account' ? '2px solid #7F7DF3' : '2px solid transparent',
									}}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open ? 'initial' : 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : 'auto',
												justifyContent: 'center',
											}}
										>
											<Image
												src={
													pathname == '/account'
														? '/svg/sub_menu/my_works.svg'
														: '/svg/sub_menu/my_works_off.svg'
												}
												width={19}
												height={19}
												alt={''}
												style={{ marginLeft: 0 }}
											/>
										</ListItemIcon>
										<ListItemText
											primary='Аккаунт'
											sx={{
												opacity: open ? 1 : 0,
												'.MuiTypography-root': {
													fontSize: 16,
													color:
														pathname == '/account' ? '#7F7DF3' : theme === 'light' ? '#373737' : '#D4D4D4',
												},
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						</TooltipCustom>
						<TooltipCustom placement='right' title='Маркетплейс'>
							<Link href='/'>
								<ListItem
									disablePadding
									sx={{ display: 'block', borderLeft: pathname === '/' ? '2px solid #7F7DF3' : '2px solid transparent' }}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open ? 'initial' : 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : 'auto',
												justifyContent: 'center',
											}}
										>
											<Image
												src={pathname == '/' ? '/market.svg' : '/market_off.svg'}
												width={19}
												height={19}
												alt={''}
											/>
										</ListItemIcon>
										<ListItemText
											primary='Маркетплейс'
											sx={{
												opacity: open ? 1 : 0,
												'.MuiTypography-root': {
													fontSize: 16,
													color: pathname == '/' ? '#7F7DF3' : theme === 'light' ? '#373737' : '#D4D4D4',
												},
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						</TooltipCustom>
						<TooltipCustom placement='right' title='Плейграунд'>
							<Link href='/chatgpt'>
								<ListItem
									disablePadding
									sx={{ display: 'block', borderLeft: isPlayground ? '2px solid #7F7DF3' : '2px solid transparent' }}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open ? 'initial' : 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : 'auto',
												justifyContent: 'center',
											}}
										>
											<Image
												src={isPlayground ? '/svg/sub_menu/catalog.svg' : '/svg/sub_menu/catalog_off.svg'}
												width={17}
												height={17}
												alt={''}
											/>
										</ListItemIcon>
										<ListItemText
											primary='Плейграунд'
											sx={{
												opacity: open ? 1 : 0,
												'.MuiTypography-root': {
													fontSize: 16,
													color: isPlayground ? '#7F7DF3' : theme === 'light' ? '#373737' : '#D4D4D4',
												},
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						</TooltipCustom>
						{data?.user?.is_superuser && (
							<TooltipCustom placement='right' title='Статистика'>
								<Link href='/admin'>
									<ListItem
										disablePadding
										sx={{
											display: 'block',
											borderLeft: pathname === '/admin' ? '2px solid #7F7DF3' : '2px solid transparent',
										}}
									>
										<ListItemButton
											sx={{
												minHeight: 48,
												justifyContent: open ? 'initial' : 'center',
												px: 2.5,
											}}
										>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: open ? 3 : 'auto',
													justifyContent: 'center',
												}}
											>
												<Image src={'/svg/side-menu/stat.svg'} width={19} height={19} alt={''} />
											</ListItemIcon>
											<ListItemText
												primary='Статистика'
												sx={{
													opacity: open ? 1 : 0,
													'.MuiTypography-root': {
														fontSize: 16,
														color:
															pathname === '/admin'
																? '#7F7DF3'
																: theme === 'light'
																? '#373737'
																: '#D4D4D4',
													},
												}}
											/>
										</ListItemButton>
									</ListItem>
								</Link>
							</TooltipCustom>
						)}
					</List>
					<List>
						<Link href='/business'>
							<TooltipCustom placement='right' title='Корп.аккаунт'>
								<ListItem
									disablePadding
									sx={{
										display: 'block',
										borderLeft: pathname.includes('/business') ? '2px solid #7F7DF3' : '2px solid transparent',
									}}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open ? 'initial' : 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : 'auto',
												justifyContent: 'center',
											}}
										>
											<Image
												src={
													pathname.includes('/business')
														? '/svg/side-menu/corp-acc-active.svg'
														: '/svg/side-menu/corp-acc.svg'
												}
												width={19}
												height={19}
												alt={''}
											/>
										</ListItemIcon>
										<ListItemText
											primary='Корп. аккаунт'
											sx={{
												opacity: open ? 1 : 0,
												'.MuiTypography-root': {
													fontSize: 16,
													color: pathname.includes('/business')
														? '#7F7DF3'
														: theme === 'light'
														? '#373737'
														: '#D4D4D4',
												},
											}}
										/>
									</ListItemButton>
								</ListItem>
							</TooltipCustom>
						</Link>
						<TooltipCustom placement='right' title='API ключи'>
							<ListItem disablePadding sx={{ display: 'block', borderLeft: '3px solid transparent' }}>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<Image src={'/svg/main_menu/api_key_off.svg'} width={19} height={19} alt={''} />
									</ListItemIcon>
									<ListItemText
										primary='API ключи'
										sx={{
											opacity: open ? 1 : 0,
											'.MuiTypography-root': { fontSize: 16, color: theme === 'light' ? '#373737' : '#D4D4D4' },
										}}
									/>
								</ListItemButton>
							</ListItem>
						</TooltipCustom>
						<TooltipCustom placement='right' title='Сообщить об ошибке'>
							<ListItem
								disablePadding
								sx={{ display: 'block', borderLeft: '3px solid transparent' }}
								onClick={handleOpenErrorModal}
							>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<Image src={'/svg/side-menu/side-question.svg'} width={20} height={20} alt={''} />
									</ListItemIcon>
									<ListItemText
										primary='Нашли ошибку?'
										sx={{
											opacity: open ? 1 : 0,
											'.MuiTypography-root': { fontSize: 16, color: theme === 'light' ? '#373737' : '#D4D4D4' },
										}}
									/>
								</ListItemButton>
							</ListItem>
						</TooltipCustom>
						<TooltipCustom placement='right' title='Сменить тему'>
							<ListItem
								disablePadding
								sx={{ display: 'block', borderLeft: '3px solid transparent' }}
								onClick={() => dispatch(change(null))}
							>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<Image src={'/sleep.svg'} width={19} height={19} alt={''} />
									</ListItemIcon>
									<ListItemText
										primary='Тёмная тема'
										sx={{
											opacity: open ? 1 : 0,
											'.MuiTypography-root': { fontSize: 16, color: theme === 'light' ? '#373737' : '#D4D4D4' },
										}}
									/>
									{open && <SwitchCustom checked={theme === 'dark'} />}
								</ListItemButton>
							</ListItem>
						</TooltipCustom>
						<a href={'https://t.me/air_platform_bot'} target='_blank'>
							<TooltipCustom placement='right' title='Telegram бот'>
								<ListItem disablePadding sx={{ display: 'block', borderLeft: '3px solid transparent' }}>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open ? 'initial' : 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : 'auto',
												justifyContent: 'center',
											}}
										>
											<Image src={'svg/bot.svg'} width={21} height={21} alt={''} />
										</ListItemIcon>
										<ListItemText
											primary='Telegram бот'
											sx={{
												opacity: open ? 1 : 0,
												'.MuiTypography-root': { fontSize: 16, color: theme === 'light' ? '#373737' : '#D4D4D4' },
											}}
										/>
									</ListItemButton>
								</ListItem>
							</TooltipCustom>
						</a>
					</List>
					<TooltipCustom placement='right' title='Выйти'>
						<ListItem
							disablePadding
							sx={{ display: 'block', borderLeft: '3px solid transparent', marginTop: 1 }}
							onClick={() => signOut()}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									<Image src={'/svg/side-menu/side-exit.svg'} width={21} height={21} alt={''} />
								</ListItemIcon>
								<ListItemText
									primary='Выйти'
									sx={{
										opacity: open ? 1 : 0,
										'.MuiTypography-root': { fontSize: 17, color: theme === 'light' ? '#373737' : '#D4D4D4' },
									}}
								/>
							</ListItemButton>
						</ListItem>
					</TooltipCustom>
				</>
			)}
			{status !== 'authenticated' && (
				<TooltipCustom placement='right' title='Сменить тему'>
					{' '}
					<ListItem
						disablePadding
						sx={{ display: 'block', borderLeft: '3px solid transparent' }}
						onClick={() => dispatch(change(null))}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<Image src={'/sleep.svg'} width={19} height={19} alt={''} />
							</ListItemIcon>
							<ListItemText
								primary='Тёмная тема'
								sx={{
									opacity: open ? 1 : 0,
									'.MuiTypography-root': { fontSize: 17, color: theme === 'light' ? '#5E5E5E' : '#D4D4D4' },
								}}
							/>
						</ListItemButton>
					</ListItem>{' '}
				</TooltipCustom>
			)}
			{openErrorModal && <ErrorModalLazy device={'desktop'} open={openErrorModal} handleClose={handleCloseErrorModal} />}
			<Box sx={{ position: 'absolute', bottom: 5, width: '100%', left: open ? 25 : 0 }}>
				{open && (
					<Box sx={{ width: 'fit-content' }}>
						<Typography sx={{ color: '#8E8E8E', fontSize: 15 }}>© Платформа AIR, 2023</Typography>
						<Typography sx={{ color: '#8E8E8E', fontSize: 15 }}>Все права защищены</Typography>
					</Box>
				)}
				{(match2 || open) && (
					<Box display='flex' flexDirection={open ? 'row' : 'column'} alignItems='center' sx={{ marginTop: 1 }}>
						<Link href='https://air.fail/' target='_blank'>
							<Image
								style={{ marginRight: open ? 13 : 0, marginLeft: 0, marginBottom: open ? 3 : 7 }}
								src={'/blog.svg'}
								width={23}
								height={23}
								alt={''}
							/>
						</Link>
						<Link href='https://vk.com/platform_air' target='_blank'>
							<Image
								style={{ marginRight: open ? 13 : 0, marginBottom: open ? 0 : 7 }}
								src={'/VK.svg'}
								width={26}
								height={26}
								alt={''}
							/>
						</Link>
						<Link href='https://t.me/platform_air' target='_blank'>
							<Image
								style={{ marginRight: open ? 13 : 0, marginBottom: open ? 0 : 7 }}
								src={'/TG.svg'}
								width={20}
								height={20}
								alt={''}
							/>
						</Link>
					</Box>
				)}
			</Box>
		</Drawer>
	)
}
