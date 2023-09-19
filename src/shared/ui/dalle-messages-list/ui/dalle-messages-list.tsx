import React, { memo } from 'react'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Image from 'next/image'

import { useAutoScroll } from '@/src/shared/lib/hooks'
import { IImagesResponse } from '@/src/shared/lib/types/types-dalle'

import styles from './dalle-messages-list.module.scss'
interface IDalleMessagesList {
	device: 'mobile' | 'desktop'
	images: any
}

export const MessagesList: React.FC<IDalleMessagesList> = memo(({ device, images }) => {
	const refScroll = useAutoScroll(images)

	return (
		<Box id={'messages-list'} className={styles.wrap}>
			{images?.length !== 0 &&
				Array.isArray(images) &&
				images.map((img) => {
					return (
						<Box key={img.link} sx={{ position: 'relative' }}>
							<a
								style={{
									position: 'absolute',
									right: 30,
									top: 20,
									backgroundColor: '#FFFFFF',
									padding: 0,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '35px',
									height: '35px',
									borderRadius: '11px',
								}}
								href={img.link}
								download
							>
								<Image width={16} height={22} src={'svg/dalle/download.svg'} alt={'Скачать'} />
							</a>
							<Image
								className={styles.image}
								style={{
									borderRadius: 20,
								}}
								width={'350'}
								height={'350'}
								src={img.link}
								alt={'К сожалению, изображение не загрузилось'}
							/>
						</Box>
					)
				})}
		</Box>
	)
})

MessagesList.displayName = 'DalleMessagesList'
