import React from 'react'
import { Stack } from '@mui/material'
import { getSession } from 'next-auth/react'

import { Layout } from '@/src/main/layout'
import { useAppSelector } from '@/src/main/store/store'
import { getAccessToken, getTypeDevice } from '@/src/shared/lib/helpers'
import { IProps } from '@/src/shared/lib/types/entities'
import { StatsField } from '@/src/widgets/stats-field'

export async function getServerSideProps(context: any): Promise<{ props: any }> {
	const device = getTypeDevice(context)

	const token = (await getAccessToken(context.req)) || null

	const { req } = context
	const session = await getSession({ req })

	if (!Boolean(session?.user?.is_superuser)) {
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

const Admin: React.FC<IProps> = ({ token, device }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Layout titlePage={'Статистика'} device={device}>
			<Stack direction='column' justifyContent='flex-start' alignItems='center' sx={{ width: '80vw', margin: '40px auto' }}>
				<StatsField device={device} token={token} theme={theme} />
			</Stack>
		</Layout>
	)
}

export default Admin
