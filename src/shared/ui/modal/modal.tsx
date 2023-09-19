import { FC, ReactNode } from 'react'
import { Box } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import Image from 'next/image'

import { useAppSelector } from '@/src/main/store/store'

import styles from './modal.module.scss'
export interface ModalProps {
	open: boolean
	onClose: (e?: any) => void
	children?: ReactNode
}
export const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Dialog
			className={styles.modal}
			sx={{
				width: '408px',
				margin: '0 auto',
				textAlign: 'center',
			}}
			PaperProps={{
				style: {
					borderRadius: 20,
					backgroundColor: theme === 'dark' ? '#373737' : 'white',
				},
			}}
			open={open}
			onClose={onClose}
		>
			<Image onClick={onClose} className={styles.close} src={'/x-mark.svg'} width={14} height={14} alt={''} />
			<Box className={styles.wrap}>{children}</Box>
		</Dialog>
	)
}
