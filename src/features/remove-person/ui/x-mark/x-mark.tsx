import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import { ResponseGetPersons } from '@/src/features/invite-person-in-business'
import { ButtonGray, ButtonUI, Modal } from '@/src/shared'

import { useRemove } from '../../model/remove'
export const XMark = ({ email, setNewPersons }: { email: string; setNewPersons: (persons: ResponseGetPersons) => void }) => {
	const [open, setOpen, removeFn] = useRemove(setNewPersons, email)

	return (
		<Box onClick={(e) => e.stopPropagation()} sx={{ marginTop: 0.5, marginLeft: 0.8 }}>
			<Image
				onClick={(e) => {
					e.stopPropagation()
					setOpen(true)
				}}
				src={'/x-mark.svg'}
				width={15}
				height={15}
				alt={'Удалить'}
			/>
			<Modal
				open={open}
				onClose={(e) => {
					e.stopPropagation()
					setOpen(false)
				}}
			>
				<Box sx={{ textAlign: 'center' }}>
					<Typography>Вы дейсвительно хотите удалить пользователя {email} из группы ?</Typography>
					<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 1.5 }}>
						<Box
							onClick={(e) => {
								e.stopPropagation()
								setOpen(false)
							}}
							sx={{ marginRight: 0.7 }}
						>
							<ButtonGray text={'Отменить'} />
						</Box>
						<ButtonUI
							onClick={async (e: any) => {
								e.stopPropagation()
								await removeFn()
							}}
							text={'Удалить'}
						/>
					</Box>
				</Box>
			</Modal>
		</Box>
	)
}
