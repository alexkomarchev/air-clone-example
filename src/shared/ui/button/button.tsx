import React from 'react'
import { Button } from '@mui/material'

import styles from './button.module.scss'
export const ButtonUI = (props: any) => {
	return (
		<Button className={styles.button} {...props}>
			{props.text}
		</Button>
	)
}
