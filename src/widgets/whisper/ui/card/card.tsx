import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import { WhisperResponse } from '@/src/widgets/whisper/ui/whisper/whisper'

import { sliceAudioLink } from '../../lib/helpers'

import styles from './card.module.scss'

interface ICard {
	remove: (uid: string) => void
}
export const Card: React.FC<WhisperResponse & ICard> = ({
	audio_link,
	audio_object_link,
	transcribed_audio,
	uid,
	target_language,
	is_translate,
	created_at,
	remove,
}) => {
	const [isHover, setIsHover] = useState(false)

	return (
		<Box className={styles.wrap}>
			<Box
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				display='flex'
				justifyContent='space-between'
				flex={1}
				width='100%'
			>
				<Box className={styles.title} display='flex'>
					<Image style={{ marginTop: 2 }} src={'/file.svg'} alt='' width={20} height={20} />
					<Typography>{sliceAudioLink(audio_link)}</Typography>
				</Box>
				{isHover && (
					<Image
						onClick={() => remove(uid)}
						style={{ marginTop: 7, cursor: 'pointer' }}
						src={'/svg/basket.svg'}
						width={18}
						height={18}
						alt='Удалить'
					/>
				)}
			</Box>
			<Typography className={styles.text}>{transcribed_audio}</Typography>
		</Box>
	)
}
