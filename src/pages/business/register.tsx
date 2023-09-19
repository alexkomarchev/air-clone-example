import React from 'react'
import { getSession } from 'next-auth/react'

import { Stepper } from '@/src/features/register-business'
import { Layout } from '@/src/main/layout'
import { getAccessToken, getTypeDevice } from '@/src/shared/lib/helpers'
import { TDevice } from '@/src/shared/lib/types/entities'

type BusinessProps = {
	device: TDevice
	token: string | null
}
export async function getServerSideProps(context: any): Promise<{ props: BusinessProps }> {
	const token = (await getAccessToken(context.req)) || null

	const device = getTypeDevice(context)

	const { req } = context
	const session = await getSession({ req })

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
const Register: React.FC<BusinessProps> = ({ device }) => {
	return (
		<Layout device={device} titlePage={'Регистрация'}>
			<Stepper />
		</Layout>
	)
}

export default Register
