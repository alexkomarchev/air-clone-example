import React from 'react'
import { Box } from '@mui/material'

import { Layout } from '@/src/main/layout'
import { getTypeDevice } from '@/src/shared/lib/helpers'
import { TDevice } from '@/src/shared/lib/types/entities'
import { WhisperWidget } from '@/src/widgets/whisper'

export async function getServerSideProps(context: any): Promise<{ props: { device: TDevice } }> {
	const device = getTypeDevice(context)

	return {
		props: {
			device,
		},
	}
}
const Whisper: React.FC<{ device: TDevice }> = ({ device }) => {
	return (
		<Layout titlePage={'Whisper'} device={device}>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ width: '50%', margin: '20px auto' }}>
					<WhisperWidget />
				</Box>
			</Box>
		</Layout>
	)
}

export default Whisper
