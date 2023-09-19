import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export const Loader = () => {
	return (
		<CircularProgress
			size={25}
			thickness={2}
			sx={{
				color: '#7F7DF3',
			}}
		/>
	)
}
