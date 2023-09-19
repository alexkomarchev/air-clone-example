import { GetServerSidePropsContext } from 'next'

import { TDevice } from '@/src/shared/lib/types/entities'

export const getTypeDevice = (context: GetServerSidePropsContext): TDevice => {
	const UA = context.req.headers['user-agent']

	if (!UA) {
		return 'desktop'
	}

	const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))

	return isMobile ? 'mobile' : 'desktop'
}
