import React, { memo } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Button, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { useAppSelector } from '@/src/main/store/store'
import { INeuronModel } from '@/src/pages'
import { Balance } from '@/src/shared'
import { NavigateTopBar } from '@/src/widgets/top-bar-model/ui/navigate-top-bar'
import { NavigateTopBarMobile } from '@/src/widgets/top-bar-model/ui/navigate-top-bar-mobile'

interface IModelTopBar {
	device: 'mobile' | 'desktop'
	favorites: INeuronModel[] | []
	token: string | null
	title: string
}

export const ModelTopBar: React.FC<IModelTopBar> = memo(({ device, token, favorites, title }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	const [anchorElModel, setAnchorElModel] = React.useState<HTMLElement | null>(null)

	const desktop = device === 'desktop'

	const { status } = useSession()

	const { pathname } = useRouter()

	const balance = useAppSelector((state) => state.balance.balance)

	const closeMenuModel = () => setAnchorElModel(null)
	const openMenuModel = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElModel(event.currentTarget)
	}
	const goToPayment = () => {
		Router.push('/account')
	}

	const LazyTutorial = dynamic(() => import('@/src/features/tutorial-gpt').then((component) => component.Tutorial))

	const LazyArrowIcon = dynamic(() => import('./arrow-up-or-down'))

	return (
		<Stack
			direction='row'
			justifyContent='space-between'
			alignItems='center'
			sx={{
				backgroundColor: desktop ? (theme === 'light' ? '#F8F8F8' : '#4B4B4B') : theme === 'light' ? '#F8F8F8' : 'transparent',
				borderRadius: desktop ? '15px' : '15px 15px',
				marginTop: desktop ? 1 : 0,
				marginBottom: desktop ? 2 : 1,
				padding: desktop ? '8px 5px' : '4px 0',
				boxShadow: desktop ? 'none' : 'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;',
			}}
		>
			<Stack direction='row' alignItems='center'>
				{desktop && <Button onClick={openMenuModel}>{desktop && <MenuIcon sx={{ color: '#7F7DF3' }} />}</Button>}
				<Stack onClick={openMenuModel as any} direction='row' alignItems='center'>
					<Typography
						onClick={openMenuModel}
						variant='body2'
						sx={{
							color: '#7F7DF3',
							lineHeight: '26.6px',
							fontSize: '19px',
							fontWeight: '600px',
							marginLeft: desktop ? 0 : 2,
						}}
					>
						{title}
					</Typography>
					{!desktop && <LazyArrowIcon anchorElModel={anchorElModel} />}
				</Stack>

				{desktop ? (
					<NavigateTopBar favorites={favorites} closeMenu={closeMenuModel} anchorEl={anchorElModel} />
				) : (
					<NavigateTopBarMobile anchorEl={anchorElModel} closeMenu={closeMenuModel} favorites={favorites} />
				)}
			</Stack>

			<Box display='flex' alignItems='center'>
				{desktop && status === 'authenticated' && pathname === '/chatgpt' && <LazyTutorial />}
				<Stack
					direction='row'
					className='tutorial-balance'
					sx={{
						backgroundColor: theme === 'light' ? (desktop ? 'white' : 'transparent') : '#373737',
						marginRight: 1.2,
						padding: desktop ? '8px 15px' : '8px 0px',
						borderRadius: '10px',
						marginLeft: 3,
					}}
				>
					{token && (
						<Link href={'/account'}>
							<Balance balance={balance} />
						</Link>
					)}
					{desktop && (
						<Typography
							variant='body2'
							sx={{
								color: '#7F7DF3',
								lineHeight: '21px',
								fontSize: '15px',
								marginLeft: token ? 3 : 0,
								'&:hover': { cursor: 'pointer' },
							}}
							onClick={goToPayment}
						>
							Купить токены
						</Typography>
					)}
				</Stack>
			</Box>
		</Stack>
	)
})

ModelTopBar.displayName = 'ModelTopBar'
