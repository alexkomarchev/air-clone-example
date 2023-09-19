import React, { memo } from 'react'
import { useCookies } from 'react-cookie'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings'
import { Avatar, Button, Tab, Tabs, Tooltip } from '@mui/material'
import { Box, Stack } from '@mui/system'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { change } from '@/src/entities/theme'
import { useAppDispatch, useAppSelector } from '@/src/main/store/store'
import { AccountMenu } from '@/src/shared'
import { NotificationMenu } from '@/src/shared'
import { TooltipFreeTokens } from '@/src/shared'

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

const subMenuTypography = {
	fontSize: '15px',
	lineHeight: '22.5px',
	'&:hover': {
		cursor: 'pointer',
	},
}

export const MainMenu: React.FC = memo(() => {
	const theme = useAppSelector((state) => state.theme.theme)

	const { pathname } = useRouter()

	const { data, status } = useSession()

	const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const goToMain = async () => {
		await Router.push('/')
	}

	const closeMenu = () => {
		setAnchorEl(null)
	}

	const login = async () => {
		closeMenu()
		await Router.push('/login')
	}

	const register = async () => {
		closeMenu()
		await Router.push('/register')
	}

	const [anchorElNotification, setAnchorElNotification] = React.useState<null | HTMLElement>(null)

	const openNotification = Boolean(anchorElNotification)

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const openMenuNotification = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElNotification(event.currentTarget)
	}

	const closeMenuNotification = () => {
		setAnchorElNotification(null)
	}

	const [openErrorModal, setOpenErrorModal] = React.useState(false)
	const handleOpenErrorModal = () => setOpenErrorModal(true)
	const handleCloseErrorModal = () => setOpenErrorModal(false)

	const selectPage = pathname === '/' ? 0 : pathname === '/api-keys' ? 1 : pathname === '/admin' ? 2 : 3

	const ErrorModalLazy = dynamic(() => import('@/src/shared/ui/error-modal'), { ssr: false })

	return (
		<Box>
			<Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between'>
				{status !== 'authenticated' && <TooltipFreeTokens />}
				<Image
					style={{ cursor: 'pointer', marginLeft: 20 }}
					onClick={goToMain}
					priority
					src='/logo.svg'
					height={26}
					width={31}
					alt='Error'
				/>

				<Tabs
					value={selectPage}
					textColor='inherit'
					TabIndicatorProps={{
						style: {
							backgroundColor: '#7F7DF3',
						},
					}}
				>
					<Tab
						label='Маркетплейс'
						icon={
							<Image
								alt={''}
								height={18}
								width={18}
								src={pathname == '/' ? '/svg/main_menu/marketplace.svg' : '/svg/main_menu/marketplace_off.svg'}
							/>
						}
						iconPosition='start'
						sx={{
							textTransform: 'none',
							color: selectPage === 0 ? '#7F7DF3' : '#868686',
						}}
						onClick={() => Router.push('/')}
						{...a11yProps(0)}
					/>
					<Tooltip
						componentsProps={{
							tooltip: {
								sx: {
									bgcolor: theme === 'light' ? '#E8E8FA' : '#4B4B4B',
									color: '#7F7DF3',
									fontSize: 15,
									borderRadius: '10px',
									padding: '10px 13px',
									'& .MuiTooltip-arrow': {
										color: theme === 'light' ? '#E8E8FA' : '#4B4B4B',
									},
									boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 32px rgba(0, 0, 0, 0.16)',
								},
							},
						}}
						title='Скоро появится'
						arrow
					>
						<Tab
							label='Плейграунд'
							icon={
								<Image
									height={18}
									width={18}
									src={pathname == '/api-keys' ? '/svg/main_menu/api_key.svg' : '/svg/main_menu/api_key_off.svg'}
									alt={''}
								/>
							}
							iconPosition='start'
							sx={{
								textTransform: 'none',
								color: selectPage === 1 ? '#7F7DF3' : '#868686',
							}}
							{...a11yProps(1)}
						/>
					</Tooltip>
					{data?.user?.is_superuser && (
						<Tab
							label='Статистика'
							onClick={() => Router.push('/admin')}
							icon={<DisplaySettingsIcon fontSize={'small'} />}
							iconPosition='start'
							sx={{
								textTransform: 'none',
								color: pathname === '/admin' ? '#7F7DF3' : '#868686',
							}}
							{...a11yProps(2)}
						/>
					)}
				</Tabs>

				<Stack direction='row' spacing={1}>
					{status === 'authenticated' && (
						<Image
							onClick={handleOpenErrorModal}
							priority
							style={{
								marginTop: 12,
								marginRight: 15,
								cursor: 'pointer',
							}}
							src='/error_off.svg'
							height={19}
							width={19}
							alt='Error'
						/>
					)}
					{openErrorModal && <ErrorModalLazy device={'desktop'} open={openErrorModal} handleClose={handleCloseErrorModal} />}

					<Image
						style={{
							marginTop: 12,
							marginRight: 5,
							cursor: 'pointer',
						}}
						width={19}
						height={19}
						src={'/sleep.svg'}
						alt={''}
					/>

					{status === 'authenticated' ? (
						<>
							<Image
								style={{
									marginTop: 12,
									marginLeft: 16,
									cursor: 'pointer',
								}}
								onClick={openMenuNotification as any}
								priority
								src='/bell.svg'
								height={19}
								width={19}
								alt='Bell'
							/>
							<NotificationMenu closeMenu={closeMenuNotification} open={openNotification} anchorEl={anchorElNotification} />
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
										data!.user.email[0]
									}
								</Avatar>
								<Image priority src='/arrow.svg' height={8} width={6} alt='Bell' />
							</Button>
							<AccountMenu anchorEl={anchorEl} changeVisible={closeMenu} />
						</>
					) : (
						<>
							<Button
								style={{
									backgroundColor: theme === 'light' ? 'rgba(90, 90, 90, 0.1)' : '#555555',
								}}
								onClick={() => login()}
								sx={{
									padding: 1.3,
									borderRadius: '10px',
									color: theme === 'light' ? '#868686' : '#D0D0D0',
									textTransform: 'none',
									...subMenuTypography,
									'&:hover': {
										backgroundColor: 'rgba(90, 90, 90, 0.1)',
									},
								}}
							>
								Вход
							</Button>
							<Button
								style={{
									backgroundColor: theme === 'light' ? '#E8E8FA' : '#514E62',
								}}
								onClick={() => register()}
								sx={{
									padding: 1.5,
									borderRadius: '10px',
									color: '#7F7DF3',
									textTransform: 'none',
									...subMenuTypography,
									'&:hover': {
										backgroundColor: '#E8E8FA',
									},
								}}
							>
								Регистрация
							</Button>
						</>
					)}
				</Stack>
			</Stack>
		</Box>
	)
})

MainMenu.displayName = 'MainMenu'
