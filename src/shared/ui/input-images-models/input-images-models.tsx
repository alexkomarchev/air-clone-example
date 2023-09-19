import React, { FC } from 'react'
import { Box, InputAdornment, TextField } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Calculation } from '@/src/features/calculation-tokens-gpt'
import { useAppSelector } from '@/src/main/store/store'
import { styleInputWithoutBorderFocus } from '@/src/shared/ui/input'

import styles from '../search/search.module.scss'

interface Input {
	loading: boolean
	requestImage: () => void
	wonderMe: () => void
	desktop: boolean
	openFilters: (event: React.MouseEvent<HTMLButtonElement>) => void
	count?: number
	quality?: string
}
export const InputImagesModels: FC<Input & TextFieldProps> = ({
	openFilters,
	loading,
	requestImage,
	value,
	onChange,
	wonderMe,
	desktop,
	count,
	quality,
}) => {
	const theme = useAppSelector((state) => state.theme.theme)

	const { pathname } = useRouter()

	return (
		<TextField
			fullWidth
			className={styles.search}
			label={'Введите описание'}
			sx={{
				...styleInputWithoutBorderFocus,
			}}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					requestImage()
				}
			}}
			InputLabelProps={{
				style: {
					color: '#868686',
					lineHeight: '21px',
					fontSize: '15px',
					fontWeight: '400px',
					borderRadius: '13px',
				},
			}}
			value={value}
			onChange={onChange}
			InputProps={{
				endAdornment: (
					<InputAdornment position='end'>
						<Stack direction='row' spacing={0} alignItems='center'>
							<IconButton
								component='label'
								sx={{
									marginRight: desktop ? 0.1 : 0.5,
									'&:hover': {
										color: '#8153FB',
									},
									width: '29px',
									height: '29px',
								}}
							>
								<Image priority src='/svg/stable/star.svg' onClick={wonderMe} height={23} width={23} alt='Error' />
							</IconButton>
							{!desktop && (
								<IconButton
									component='label'
									sx={{
										marginRight: 1,
										'&:hover': {
											color: '#8153FB',
										},
										width: '29px',
										height: '29px',
									}}
								>
									<Image
										priority
										src='/svg/dalle/settings.svg'
										//@ts-ignore
										onClick={openFilters}
										height={21}
										width={21}
										alt='Error'
									/>
								</IconButton>
							)}
							{pathname !== '/stable-diffusion' && (
								<Box sx={{ marginRight: desktop ? 0.5 : 0.5 }}>
									<Calculation count={count} quality={quality} model={'dalle'} />
								</Box>
							)}
							<Box>
								{!loading ? (
									<Image
										onClick={requestImage}
										height={25}
										width={25}
										style={{ marginTop: 4, cursor: 'pointer' }}
										src={`/svg/chatgpt/send_message${theme === 'light' ? '' : '_dark'}.svg`}
										alt={''}
									/>
								) : (
									<CircularProgress
										size={25}
										thickness={3}
										sx={{
											marginTop: 0.5,
											color: '#7F7DF3',
										}}
									/>
								)}
							</Box>
						</Stack>
					</InputAdornment>
				),
			}}
		/>
	)
}
