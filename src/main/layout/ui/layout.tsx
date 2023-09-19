import React from 'react'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import { useSession } from 'next-auth/react'

import { getUserBalance } from '@/src/entities/balance'
import { useTheme } from '@/src/entities/theme'
import { getUserType } from '@/src/entities/user-account'
import InfoBar from '@/src/main/layout/ui/info-bar'
import { useAppDispatch } from '@/src/main/store/store'
import { pingFangFont } from '@/src/shared/lib/constants/font/font'
import { TDevice } from '@/src/shared/lib/types/entities'
import { MainMenuMobile } from '@/src/widgets/main-menu'
import { SideMenu } from '@/src/widgets/side-menu'

interface Props {
	children: React.ReactNode
	titlePage: string
	device?: TDevice
	isAuthPage?: boolean
	title?: string | React.ReactNode | null
}

export const Layout: React.FC<Props> = ({ children, device, isAuthPage = false, titlePage, title = titlePage }) => {
	const desktop = device === 'desktop'

	const dispatch = useAppDispatch()

	useTheme()

	const { data } = useSession()

	React.useEffect(() => {
		if (!data?.access) {
			return
		}
		dispatch(getUserBalance(data?.access))
		dispatch(getUserType(data?.access))
	}, [data?.access])

	return (
		<>
			<Head>
				<title>{titlePage}</title>
				<meta name='AIR' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/logo.svg' />
			</Head>
			<Box
				id={'layout'}
				sx={{
					width: '100%',
					height: desktop ? '100%' : '100vh',
					padding: isAuthPage ? '0px' : desktop ? '0px' : '10px',
				}}
			>
				<Box
					sx={{
						padding: desktop ? '0px' : '1px',
					}}
				>
					<ThemeProvider theme={pingFangFont}>
						{!isAuthPage ? (
							desktop ? (
								<Box display='flex'>
									<SideMenu />
									<Box width='100%'>
										<InfoBar title={title} device={device} token={''} />
										<Box width='100%' margin='0px auto'>
											{children}
										</Box>
									</Box>
								</Box>
							) : (
								<Box>
									<MainMenuMobile />
									{children}
								</Box>
							)
						) : (
							<>{children}</>
						)}
					</ThemeProvider>
				</Box>
			</Box>
		</>
	)
}
