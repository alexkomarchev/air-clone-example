import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const ArrowUpOrDown = (props: any) => {
	return (
		<>
			{props.anchorElModel ? (
				<KeyboardArrowUpIcon sx={{ color: '#7F7DF3' }} {...props} />
			) : (
				<KeyboardArrowDownIcon sx={{ color: '#7F7DF3' }} {...props} />
			)}
		</>
	)
}

export default ArrowUpOrDown
