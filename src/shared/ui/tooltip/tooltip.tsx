import React from 'react'
import { Tooltip } from '@mui/material'

import { useAppSelector } from '@/src/main/store/store'

import styles from './styles.module.scss'
interface Props {
	title?: string
	children: React.ReactNode
	placement?:
		| 'bottom-end'
		| 'bottom-start'
		| 'bottom'
		| 'left-end'
		| 'left-start'
		| 'left'
		| 'right-end'
		| 'right-start'
		| 'right'
		| 'top-end'
		| 'top-start'
		| 'top'
}
export const TooltipCustom: React.FC<Props> = ({ children, title, placement }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Tooltip
			componentsProps={{
				tooltip: {
					sx: {
						bgcolor: theme === 'light' ? '#E8E8FA' : '#4B4B4B',
						color: '#7F7DF3',
						fontSize: 15,
						borderRadius: '10px',
						padding: '10px 13px',
						'& .MuiTooltip-arrow': {
							color: theme === 'light' ? '#E8E8FA' : '#4B4B4B',
						},
						boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 32px rgba(0, 0, 0, 0.16)',
					},
				},
			}}
			title={title}
			arrow
			placement={placement}
		>
			<span>{children}</span>
		</Tooltip>
	)
}
