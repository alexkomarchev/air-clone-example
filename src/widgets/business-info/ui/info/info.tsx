import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { useAppSelector } from '@/src/main/store/store'
import { Balance } from '@/src/shared'

import { getInfo, InfoBusiness } from '../../api/get-info'

import styles from './info.module.scss'
export const Info = () => {
	const [data, setData] = useState<InfoBusiness | null>(null)

	const type = useAppSelector((state) => state.user.type)

	const balance = useAppSelector((state) => state.balance.balance)

	const { data: session } = useSession()

	useEffect(() => {
		getInfo(session?.access).then((res) => setData(res))
	}, [session?.access])

	return (
		<Box className={styles.wrap}>
			<Box className={styles.left}>
				<Typography className={styles.title}>{data?.company_name}</Typography>
				<Typography className={styles.role}>Роль: {type === 'business_host' ? 'Владелец' : 'Участник'}</Typography>
			</Box>
			<Box className={styles.right}>
				<Balance className={styles.balance} balance={balance} />
				<Link href={'/account'}>
					<Typography className={styles.addBalance}>Пополнить баланс</Typography>
				</Link>
			</Box>
		</Box>
	)
}
