import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { ButtonUI } from '@/src/shared'

import styles from './screen-for-inactive.module.scss'
export const ScreenForInactive = () => {
	return (
		<Box className={styles.screenWrap}>
			<Box className={styles.screen}>
				<Image className={styles.screenIcon} src={'/svg/business/profile.svg'} width={31} height={46} alt={''} />
				<Typography className={styles.screenTitle}>Корпоративный аккаунт</Typography>
				<Typography className={styles.screenDescription}>Для бизнеса и команд</Typography>
				<Box className={styles.screenIcons}>
					<Box className={styles.screenIconsItem}>
						<Image src={'/svg/business/svg-people.svg'} width={40} height={40} alt={''} />
						<Typography>Работа с платформой для всей команды</Typography>
					</Box>
					<Box className={styles.screenIconsItem}>
						<Image src={'/svg/business/svg-key.svg'} width={40} height={40} alt={''} />
						<Typography>Управление доступами и лимитами</Typography>
					</Box>
					<Box className={styles.screenIconsItem}>
						<Image src={'/svg/business/svg-token.svg'} width={40} height={40} alt={''} />
						<Typography>Общий баланс токенов</Typography>
					</Box>
				</Box>
				<Box className={styles.screenButton}>
					<Link href='/business/register'>
						<ButtonUI variant='contained' text='Подключить' />
					</Link>
				</Box>
			</Box>
		</Box>
	)
}
