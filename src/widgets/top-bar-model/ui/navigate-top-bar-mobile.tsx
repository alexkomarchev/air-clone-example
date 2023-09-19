import * as React from 'react'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAppSelector } from '@/src/main/store/store'
import { INeuronModel } from '@/src/pages'

import { IModelMenu } from './navigate-top-bar'

export const NavigateTopBarMobile: React.FC<IModelMenu> = ({ anchorEl, closeMenu, favorites }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	const { pathname } = useRouter()

	return (
		<>
			<Menu
				id='model-menu'
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeMenu}
				sx={{
					'.MuiMenu-paper': {
						backgroundColor: theme === 'light' ? '' : '#3D3D3D',
						width: '100%',
						borderRadius: '15px',
						marginTop: 1.5,
					},
				}}
				MenuListProps={{ 'aria-labelledby': 'model-button' }}
			>
				{favorites?.length !== 0 && (
					<Typography
						variant='body2'
						sx={{
							color: theme === 'light' ? '#5B5B5B' : '#A6A5A5',
							lineHeight: '18.2px',
							fontSize: '15px',
							fontWeight: '600',
							marginLeft: 2,
							marginTop: 0.8,
						}}
					>
						Избранные
					</Typography>
				)}
				{favorites?.map((el) => {
					return (
						<Link key={el.uid} href={el.link}>
							<Typography
								variant='body2'
								sx={{
									color: '#7F7DF3',
									lineHeight: '19.6px',
									fontSize: '16px',
									marginLeft: 2,
									marginTop: 1.5,
									marginBottom: 0.5,
								}}
							>
								{el.title}
							</Typography>
						</Link>
					)
				})}
				<Typography
					variant='body2'
					sx={{
						color: theme === 'light' ? '#5B5B5B' : '#A6A5A5',
						lineHeight: '18.2px',
						fontSize: '15px',
						fontWeight: '600',
						marginLeft: 2,
						marginTop: 1.5,
					}}
				>
					Текст
				</Typography>

				<Link href='/chatgpt'>
					<Typography
						variant='body2'
						sx={{
							color: pathname === '/chatgpt' ? '#7F7DF3' : '#868686',
							lineHeight: '19.6px',
							fontSize: '16px',
							marginLeft: 2,
							marginTop: 1.5,
							marginBottom: 0.5,
						}}
					>
						ChatGPT
					</Typography>
				</Link>

				<Typography
					variant='body2'
					sx={{
						color: theme === 'light' ? '#5B5B5B' : '#A6A5A5',
						lineHeight: '18.2px',
						fontSize: '15px',
						fontWeight: '600',
						marginLeft: 2,
						marginTop: 1.5,
					}}
				>
					Изображения
				</Typography>

				<Link href='/dalle'>
					<Typography
						variant='body2'
						sx={{
							color: pathname === '/dalle' ? '#7F7DF3' : '#868686',
							lineHeight: '19.6px',
							fontSize: '16px',
							marginLeft: 2,
							marginTop: 1.5,
							marginBottom: 0.5,
						}}
					>
						DALLE
					</Typography>
				</Link>

				<Link href='/stable-diffusion'>
					<Typography
						variant='body2'
						sx={{
							color: pathname === '/stable-diffusion' ? '#7F7DF3' : '#868686',
							lineHeight: '19.6px',
							fontSize: '16px',
							marginLeft: 2,
							marginTop: 1.5,
							marginBottom: 0.5,
						}}
					>
						Stable Diffusion
					</Typography>
				</Link>
			</Menu>
		</>
	)
}
