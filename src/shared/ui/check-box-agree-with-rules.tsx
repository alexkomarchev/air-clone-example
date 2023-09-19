import React from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types/form'
import { Box, Checkbox, FormHelperText, Typography } from '@mui/material'
import Link from 'next/link'

interface ICheckBoxAgreeWithRulesProps {
	isAgree?: boolean
	changeAgree?: () => void
	isAgreeError?: boolean
	register?: UseFormRegister<any>
	name?: string
}

export const CheckBoxAgreeWithRules: React.FC<ICheckBoxAgreeWithRulesProps> = ({ isAgree, changeAgree, isAgreeError, name, register }) => {
	return (
		<>
			<Box display='flex' width='100%'>
				<Checkbox
					{...(register
						? register(name!, {
								required: 'Примите пользовательское соглашение',
						  })
						: null)}
					checked={isAgree}
					onChange={changeAgree}
					size='medium'
					sx={{
						color: '#7F7DF3',
						'&.Mui-checked': {
							color: '#7F7DF3',
						},
					}}
				/>
				<Typography
					sx={{
						fontSize: '15px',
						marginTop: 1.1,
						color: '#868686',
					}}
				>
					{' '}
					Я соглашаюсь с условиями{' '}
					<Link
						href='https://air.fail/personal'
						style={{
							color: '#7F7DF3',
						}}
					>
						Политики обработки персональных данных
					</Link>{' '}
					и{' '}
					<Link
						style={{
							color: '#7F7DF3',
						}}
						href='https://air.fail/offer'
					>
						Публичной офертой
					</Link>
				</Typography>
			</Box>
			{isAgreeError && (
				<Typography
					sx={{
						fontSize: '15px',
						marginTop: 1.5,
						marginLeft: 1.5,
						color: '#F15179',
					}}
				>
					Для продолжения примите соглашение
				</Typography>
			)}
		</>
	)
}
