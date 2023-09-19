import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { useAppSelector } from '@/src/main/store/store'
import { INeuronModel } from '@/src/pages'
import { api } from '@/src/shared/api/endpoints'

export interface IModelMenu {
	anchorEl: HTMLElement | null
	closeMenu: () => void
	favorites?: INeuronModel[] | []
}

export const NavigateTopBar: React.FC<IModelMenu> = ({ anchorEl, closeMenu }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	const [favorites, setFavorites] = React.useState<INeuronModel[] | []>([])

	const { data } = useSession()

	React.useEffect(() => {
		if (!data?.access) {
			return
		}
		api.getFavoritesModel(data?.access, data).then((res) => setFavorites(res))
	}, [data])

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
					},
				}}
				MenuListProps={{ 'aria-labelledby': 'model-button' }}
			>
				{favorites?.length !== 0 && (
					<MenuItem>
						<Typography
							variant='body2'
							sx={{
								color: theme === 'light' ? '#5B5B5B' : '#A6A5A5',
								lineHeight: '18.2px',
								fontSize: '15px',
								fontWeight: '600px',
								marginLeft: 1,
							}}
						>
							Избранные
						</Typography>
					</MenuItem>
				)}
				{favorites?.map((el) => {
					return (
						<Link key={el.uid} href={el.link}>
							<MenuItem>
								<Typography
									variant='body2'
									sx={{
										color: '#7F7DF3',
										lineHeight: '19.6px',
										fontSize: '15px',
										fontWeight: '400px',
										marginLeft: 1,
									}}
								>
									{el.title}
								</Typography>
							</MenuItem>
						</Link>
					)
				})}
				<MenuItem>
					<Typography
						variant='body2'
						sx={{
							color: theme === 'light' ? '#5B5B5B' : '#A6A5A5',
							lineHeight: '18.2px',
							fontSize: '15px',
							fontWeight: '600px',
							marginLeft: 1,
						}}
					>
						Текст
					</Typography>
				</MenuItem>
				<Link href='/chatgpt'>
					<MenuItem>
						<Typography
							variant='body2'
							sx={{
								color: '#7F7DF3',
								lineHeight: '19.6px',
								fontSize: '15px',
								fontWeight: '400px',
								marginLeft: 1,
							}}
						>
							ChatGPT
						</Typography>
					</MenuItem>
				</Link>
				<MenuItem>
					<Typography
						variant='body2'
						sx={{
							color: theme === 'light' ? '#5B5B5B' : '#A6A5A5',
							lineHeight: '18.2px',
							fontSize: '15px',
							fontWeight: '600px',
							marginLeft: 1,
						}}
					>
						Изображения
					</Typography>
				</MenuItem>
				<Link href='/stable-diffusion'>
					<MenuItem>
						<Typography
							variant='body2'
							sx={{
								color: '#7F7DF3',
								lineHeight: '19.6px',
								fontSize: '15px',
								fontWeight: '400px',
								marginLeft: 1,
							}}
						>
							Stable Diffusion
						</Typography>
					</MenuItem>
				</Link>
				<Link href='/kandinsky'>
					<MenuItem>
						<Typography
							variant='body2'
							sx={{
								color: '#7F7DF3',
								lineHeight: '19.6px',
								fontSize: '15px',
								fontWeight: '400px',
								marginLeft: 1,
							}}
						>
							Kandinsky
						</Typography>
					</MenuItem>
				</Link>
				<Link href='/dalle'>
					<MenuItem>
						<Typography
							variant='body2'
							sx={{
								color: '#7F7DF3',
								lineHeight: '19.6px',
								fontSize: '15px',
								fontWeight: '400px',
								marginLeft: 1,
							}}
						>
							DALLE
						</Typography>
					</MenuItem>
				</Link>
				<MenuItem>
					<Typography
						variant='body2'
						sx={{
							color: theme === 'light' ? '#5B5B5B' : '#A6A5A5',
							lineHeight: '18.2px',
							fontSize: '15px',
							fontWeight: '600px',
							marginLeft: 1,
						}}
					>
						Аудио
					</Typography>
				</MenuItem>
				<Link href='/whisper'>
					<MenuItem>
						<Typography
							variant='body2'
							sx={{
								color: '#7F7DF3',
								lineHeight: '19.6px',
								fontSize: '15px',
								fontWeight: '400px',
								marginLeft: 1,
							}}
						>
							Whisper
						</Typography>
					</MenuItem>
				</Link>
			</Menu>
		</>
	)
}
