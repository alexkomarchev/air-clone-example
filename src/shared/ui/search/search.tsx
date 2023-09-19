import React from 'react'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import Image from 'next/image'

import { styleInputWithoutBorderFocus } from '@/src/shared/ui/input'

import styles from './search.module.scss'
export const Search = (props: TextFieldProps) => {
	return (
		<TextField
			sx={styleInputWithoutBorderFocus}
			className={styles.search}
			{...props}
			InputProps={{ endAdornment: <Image src={'/search.svg'} style={{ marginRight: '15px' }} width={20} height={20} alt={'1'} /> }}
		/>
	)
}
