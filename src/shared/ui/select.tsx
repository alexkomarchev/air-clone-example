import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'

import { useAppSelector } from '@/src/main/store/store'
import { baseColor } from '@/src/shared/lib/constants/colors'

interface ISelect {
	value: any
	onChange: (e: SelectChangeEvent<string>) => void
	list?: any
	title?: string
	children?: React.ReactNode
	[x: string]: any
}

export const SelectUI: React.FC<ISelect> = ({ value, onChange, list, title, children, ...args }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<>
			{title && (
				<Typography
					variant='body2'
					sx={{
						color: '#868686',
						fontSize: '14px',
						fontWeight: '600px',
						marginBottom: 0.5,
						marginLeft: 0.5,
					}}
				>
					{title}
				</Typography>
			)}
			<Select
				IconComponent={KeyboardArrowDownIcon}
				value={value}
				onChange={onChange}
				inputProps={{
					MenuProps: {
						MenuListProps: {
							backgroundColor: theme === 'light' ? 'transparent' : '#4B4B4B',
							sx: {
								color: theme === 'light' ? '#373737' : '#A6A5A5',
								backgroundColor: theme === 'light' ? 'transparent' : '#4B4B4B',
							},
						},
					},
				}}
				style={{
					backgroundColor: theme === 'light' ? 'transparent' : '#4B4B4B',
				}}
				sx={{
					boxShadow: 'none',
					borderRadius: '13px',
					backgroundColor: theme === 'light' ? 'transparent' : '#4B4B4B',
					border: theme === 'light' ? '1px solid transparent' : '0px solid transparent',
					color: theme === 'light' ? '#373737' : '#A6A5A5',
					'.MuiSelect-icon': {
						color: '#A6A5A5',
					},
					'&& fieldset': {
						border: theme === 'light' ? '1px solid #E9E9E9' : '0px solid transparent',
					},
					'&.Mui-focused': {
						border: theme === 'light' ? `1px solid ${baseColor}` : '0px solid transparent',
						borderColor: baseColor,
						'& .MuiOutlinedInput-notchedOutline': {
							border: 'none',
						},
					},
					'&:hover': {
						'&& fieldset': {
							border: theme === 'light' ? '1px solid #E9E9E9' : '0px solid transparent',
						},
					},
				}}
				fullWidth
				{...args}
			>
				{list?.map((format: any) => {
					return (
						<MenuItem key={format} value={format}>
							<Typography sx={{ fontSize: '18px' }}>{format}</Typography>
						</MenuItem>
					)
				})}
				{children}
			</Select>
		</>
	)
}
