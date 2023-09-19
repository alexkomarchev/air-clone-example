import * as React from 'react'
import { ChangeEvent, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useSession } from 'next-auth/react'

import { useAppSelector } from '@/src/main/store/store'
import { API_HOST } from '@/src/shared/lib/constants/constants'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 589,
	height: 'auto',
	bgcolor: 'background.paper',
	borderRadius: 5,
	boxShadow: 16,
	p: 4,
}
const styleSend = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -65%)',
	width: 300,
	height: 'auto',
	bgcolor: 'background.paper',
	borderRadius: 5,
	boxShadow: 16,
	p: 4,
	textAlign: 'center',
}

const styleSendDark = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -65%)',
	width: 300,
	height: 'auto',
	bgcolor: '#2B2828',
	borderRadius: 5,
	boxShadow: 16,
	p: 4,
	textAlign: 'center',
}

const styleMobile = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	p: 4,
	zIndex: 99,
}

interface IErrorModal {
	open: boolean
	handleClose: () => void
	device: 'mobile' | 'desktop'
}

const ErrorModal: React.FC<IErrorModal> = ({ open, handleClose, device }) => {
	const [errorMessage, setErrorMessage] = React.useState<string>('')

	const [error, setError] = React.useState(false)

	const [isSend, setIsSend] = React.useState(false)

	const [file, setFile] = React.useState<File>()

	const { data: session } = useSession()

	const theme = useAppSelector((state) => state.theme.theme)

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			if (4500000 > e.target.files[0].size) setFile(e.target.files[0])
		}
	}
	const sendError = async () => {
		if (errorMessage.trim() === '') {
			setError(true)
			setTimeout(() => setError(false), 3000)
			return
		}

		let formData: any = new FormData()

		formData.append('report_text', `${session?.user?.email}: ${errorMessage}`) //append the values with key, value pair
		if (file) {
			formData.append('images', file)
		}

		try {
			const { status } = await axios.post(API_HOST + '/reports/', formData, {
				headers: {
					'content-type': 'multipart/form-data ',
					'content-length': file ? `${file.size}` : '',

					Authorization: `Bearer ${session?.access}`,
				},
			})

			if (status === 201) {
				setErrorMessage('')
				setIsSend(true)
				setTimeout(() => {
					setIsSend(false)
					handleClose()
				}, 4000)
			}
		} catch (err) {
			setError(true)
			setTimeout(() => setError(false), 3000)
		}
	}

	return (
		<Modal
			sx={{
				'.css-hqvkjc': {
					backgroundColor: theme === 'light' ? '' : '#373737',
					border: 'none',
				},
			}}
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			{isSend ? (
				<Box sx={theme === 'light' ? styleSend : styleSendDark}>
					<Typography sx={{ color: '#22B47F', fontSize: '23px' }}>Спасибо!</Typography>
					<Typography
						sx={{
							fontSize: '17px',
							marginTop: 2,
							color: '#868686',
						}}
					>
						Ваше сообщение направлено нашим специалистам. Ответ придет на почту, указанную при регистрации
					</Typography>
				</Box>
			) : (
				<Box sx={device === 'desktop' ? style : styleMobile}>
					<Typography
						variant='h6'
						component='h2'
						sx={{
							color: theme === 'light' ? '#5A5A5A' : '#E1E1E1',
							lineHeight: '28.5px',
							fontSize: '21px',
							fontWeight: '600px',
						}}
					>
						Сообщить об ошибке
					</Typography>
					<TextField
						error={error}
						id='outlined-multiline-static'
						multiline
						rows={4}
						placeholder='Опишите детально возникшую проблему'
						fullWidth
						onChange={(evt) => setErrorMessage(evt.target.value)}
						InputProps={{
							startAdornment: (
								<>
									<Button
										variant='contained'
										component='label'
										sx={{
											position: 'absolute',
											padding: 0,
											bottom: 13,
											left: -10,
											backgroundColor: 'transparent',
											border: 'none',
											boxShadow: 'none',
											margin: 0,
											rotate: '30deg',
											'&:hover': {
												backgroundColor: 'transparent',
												boxShadow: 'none',
											},
										}}
									>
										<AttachFileIcon
											color='info'
											sx={{
												cursor: 'pointer',
												color: '#868686',
												width: 25,
												height: 25,
											}}
										/>
										<input onChange={handleFileChange} type='file' hidden accept='.jpg,.jpeg,.png' />
									</Button>
								</>
							),
						}}
						sx={{
							marginTop: 2.5,
							marginBottom: 1.2,
							fontSize: 13,
							'& label': { color: '#8853FA' },
							backgroundColor: theme === 'light' ? 'transparent' : '#3D3D3D',
							input: {
								color: theme === 'light' ? '#272727' : '#E1E1E1',
							},
						}}
					/>
					{file && (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Typography sx={{ fontSize: '15px' }}>Добавлено 1 изображение: {file.name}</Typography>
							<CloseIcon
								onClick={() => setFile(undefined)}
								sx={{
									width: '18px',
									height: '18px',
									cursor: 'pointer',
									marginLeft: '3px',
									marginTop: '2px',
								}}
							/>
						</Box>
					)}

					<Stack
						direction={device === 'desktop' ? 'row' : 'column-reverse'}
						justifyContent='flex-end'
						alignItems='flex-end'
						spacing={1}
						sx={{ marginTop: 1.5 }}
					>
						<Button
							fullWidth={device === 'mobile'}
							onClick={() => handleClose()}
							sx={{
								color: theme === 'light' ? '#5A5A5A' : '#D0D0D0',
								backgroundColor: theme === 'light' ? '#E8E8E8' : '#5D5A5A',
								fontWeight: 500,
								fontSize: '16px',
								textTransform: 'none',
								padding: '8px 12px',
								borderRadius: '13px',
								border: 'none',
								cursor: 'pointer',
								marginTop: device === 'desktop' ? 0 : 1,
							}}
						>
							Отмена
						</Button>
						<Button
							fullWidth={device === 'mobile'}
							variant='contained'
							onClick={sendError}
							sx={{
								color: 'white',
								backgroundColor: '#7F7DF3',
								fontWeight: 500,
								fontSize: '16px',
								textTransform: 'none',
								padding: '7px 12px',
								borderRadius: '13px',
								border: 'none',
								cursor: 'pointer',
							}}
						>
							Отправить
						</Button>
					</Stack>
				</Box>
			)}
		</Modal>
	)
}

export default ErrorModal
