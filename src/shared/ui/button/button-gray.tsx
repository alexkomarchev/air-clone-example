import React from 'react'
import { Button } from '@mui/material'

import styles from './button.module.scss'
export const ButtonGray = (props: any) => {
	return (
		<Button className={styles.buttonGray} {...props}>
			{props.text}
		</Button>
	)
}
