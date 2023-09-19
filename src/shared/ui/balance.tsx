import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

export const Balance = (props: any) => {
	return (
		<Box display='flex' alignItems='center'>
			<Image src={'/token.svg'} width={16} height={16} alt={''} />
			<Typography sx={{ fontSize: 15, color: '#8E8E8E', marginLeft: 0.5 }} {...props}>
				{Math.floor(props.balance)}
			</Typography>
		</Box>
	)
}
