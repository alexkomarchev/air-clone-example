import React, { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'

import { ResponseGetPersons } from '@/src/features/invite-person-in-business'
import { useAppSelector } from '@/src/main/store/store'
import { ButtonUI, InputStyleDark, InputStyleLight, Modal } from '@/src/shared'
import styles from '@/src/widgets/business-models/ui/models-list/models-list.module.scss'
import styles2 from '@/src/widgets/business-persons/ui/persons-list/persons-list.module.scss'

import { updateLimit } from '../api/set-limit'

interface LimitModalProps {
	person: ResponseGetPersons | null
	onClose: () => void
	updateLimitProp: (limit: string, email?: string) => void
}

export const LimitModal: React.FC<LimitModalProps> = ({ person, onClose, updateLimitProp }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	const [limit, setLimit] = useState(person?.token_limit ? Math.floor(+person.token_limit).toString() : '0')

	const { data } = useSession()
	const handleChangeBalance = () => {
		updateLimit(person?.email, limit, data?.access).then((res) => {
			if (res === null) {
				return
			}

			updateLimitProp(res, person?.email)
		})
	}

	return (
		<Modal
			open={!!person}
			onClose={() => {
				setLimit('0')
				onClose()
			}}
		>
			<Box className={styles2.modalWrap}>
				<Typography sx={{ marginBottom: '20px' }} className={styles.titleModalLimit}>
					Изменение лимита токенов для {person?.email}
				</Typography>
				<TextField
					value={limit}
					onChange={(e) => setLimit(e.target.value)}
					fullWidth
					sx={theme === 'light' ? { ...InputStyleLight } : { ...InputStyleDark }}
				/>
				<ButtonUI onClick={handleChangeBalance} sx={{ marginTop: 4 }} text={'Установить'}>
					Отмена
				</ButtonUI>
			</Box>
		</Modal>
	)
}
