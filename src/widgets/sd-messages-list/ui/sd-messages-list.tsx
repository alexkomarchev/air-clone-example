import React, { memo } from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import { useAppSelector } from '@/src/main/store/store'
import { useAutoScroll } from '@/src/shared/lib/hooks'
import { IResponseSD } from '@/src/shared/lib/types/types-sd'

interface ISDMessagesList {
	messages: IResponseSD[]
	device: 'mobile' | 'desktop'
}
export const SdMessagesList: React.FC<ISDMessagesList> = memo(({ messages, device }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	const refScroll = useAutoScroll(messages)

	const desktop = device === 'desktop'

	return (
		<Box
			ref={refScroll}
			sx={{
				overflowY: 'scroll',
				backgroundColor: desktop ? (theme === 'light' ? '#F8F8F8' : '#4B4B4B') : theme === 'light' ? 'white' : '#4B4B4B',
				maxWidth: '100%',
				padding: 2,
				borderRadius: 5,
			}}
		>
			{messages?.map((img) => {
				return (
					<Box key={img.created_at} display={'flex'} sx={{ margin: desktop ? 1 : 0, marginTop: 1.5 }}>
						{desktop && <Image height={29} width={29} src='/svg/chatgpt/avatar.svg' alt={''} />}
						<Box
							display='flex'
							flexDirection='column'
							alignItems='center'
							sx={{
								backgroundColor: theme === 'light' ? 'white' : '#3D3D3D',
								marginLeft: desktop ? 2 : 0,
								borderRadius: '13px',
								padding: 2.5,
							}}
						>
							<Box sx={{ position: 'relative' }}>
								<a
									style={{
										position: 'absolute',
										right: 22,
										top: 20,
										backgroundColor: theme === 'light' ? '#FFFFFF' : '#373737',
										padding: 0,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										width: '45px',
										height: '45px',
										borderRadius: '11px',
									}}
									href={img.link}
									download
								>
									<Image width={20} height={25} src={'svg/dalle/download.svg'} alt={'Скачать'} />
								</a>
								<Image style={{ borderRadius: 15 }} width={270} height={320} key={img.link} src={img.link} alt={'np'} />
							</Box>
							<Box display='flex' justifyContent='space-between' width='100%'>
								<Typography
									sx={{
										fontSize: 16,
										marginTop: 1,
										color: theme === 'light' ? 'black' : '#FFFFFF',
									}}
								>
									<span
										style={{
											fontWeight: '600',
											fontSize: 16,
										}}
									>
										Запрос:{' '}
									</span>
									{img.question}
								</Typography>
								<Typography
									sx={{
										fontSize: 15,
										marginTop: 1,
										color: theme === 'light' ? '#868686' : '#A6A5A5',
									}}
								>
									{img.created_at.slice(10, 16).replace('T', ' ')}
								</Typography>
							</Box>
						</Box>
					</Box>
				)
			})}
		</Box>
	)
})

SdMessagesList.displayName = 'SdMessagesList'
