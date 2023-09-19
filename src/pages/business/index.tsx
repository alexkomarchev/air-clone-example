import React from 'react'
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { log } from 'next/dist/server/typescript/utils'
import { getSession } from 'next-auth/react'

import { Layout } from '@/src/main/layout'
import { useAppSelector } from '@/src/main/store/store'
import styles from '@/src/main/styles/business.module.scss'
import { getAccessToken, getTypeDevice } from '@/src/shared/lib/helpers'
import { TDevice } from '@/src/shared/lib/types/entities'
import { ScreenForInactive } from '@/src/widgets/business'
import { Info } from '@/src/widgets/business-info'
import { ModelsList } from '@/src/widgets/business-models'
import { PersonsList } from '@/src/widgets/business-persons'

type BusinessProps = {
	device: TDevice
	token: string | null
}
export async function getServerSideProps(context: any): Promise<{ props: BusinessProps }> {
	const token = (await getAccessToken(context.req)) || null

	const device = getTypeDevice(context)

	const { req } = context

	//@ts-ignore
	if (!token) {
		return {
			//@ts-ignore
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			device,
			token,
		},
	}
}

const Business: React.FC<BusinessProps> = ({ device }) => {
	const { status, type } = useAppSelector((state) => state.user)

	const body = () => {
		if (type === 'regular') {
			return <ScreenForInactive />
		}
		if (type === 'business_account') {
			return <Box className={styles.main}>Информация о корп.аккаунте доступна только владельцу и администраторам.</Box>
		}
		if (type === 'business_host') {
			return (
				<Box className={styles.main}>
					<Info />
					<ModelsList />
					<PersonsList />
				</Box>
			)
		}
	}

	return (
		<Layout device={device} titlePage={'Корпоративный аккаунт'}>
			<Box className={styles.wrap}>
				{status == 'pending' || type === null ? (
					<Box className={styles.loading}>
						<CircularProgress
							size={25}
							thickness={5}
							sx={{
								color: '#7F7DF3',
							}}
						/>
					</Box>
				) : (
					<Box className={styles.wrap2}>{body()}</Box>
				)}
			</Box>
		</Layout>
	)
}

export default Business
