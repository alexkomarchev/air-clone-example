import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { useAppSelector } from '@/src/main/store/store'
import { Error, Loader, useShowData } from '@/src/shared'
import { API_HOST, API_URL } from '@/src/shared/lib/constants'
import { decodeError } from '@/src/shared/lib/helpers/decode-error'
import { styleInputWithoutBorderFocus } from '@/src/shared/ui/input'
import styles from '@/src/shared/ui/search/search.module.scss'
import { getAudioList } from '@/src/widgets/whisper/api/getAudioList'

import { Card } from '../card/card'

import styles2 from './whisper.module.scss'

export interface WhisperResponse {
	audio_link: string
	audio_object_link: string
	created_at: string
	is_translate: boolean
	target_language: string
	transcribed_audio: string
	uid: string
}

export const WhisperWidget = () => {
	const theme = useAppSelector((state) => state.theme.theme)

	const ref = useRef<HTMLInputElement>(null)

	const [audio, setAudio] = useState<File>()

	const [list, setList] = useState<WhisperResponse[] | null>(null)

	const [loading, setLoading] = useState(false)

	const setMp = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setAudio(e.target.files[0])
		}
	}

	const { data: session } = useSession()
	const removeAudio = async (uid: string) => {
		try {
			const { status } = await axios.delete(API_URL + '/ml_models/whisper', {
				headers: {
					Authorization: `Bearer ${session?.access}`,
				},
				data: {
					uid,
				},
			})

			if (status === 204) {
				setList((prev) => (prev !== null ? prev.filter((el) => el.uid !== uid) : prev))
			}
		} catch (err) {}
	}

	const { error, showError } = useShowData()

	const transcript = async (e: any) => {
		if (!audio) {
			return
		}

		e.stopPropagation()
		let formData: any = new FormData()
		setLoading(true)
		formData.append('audio', audio)

		try {
			const { data: result } = await axios.post<WhisperResponse>(API_HOST + '/ml_models/whisper', formData, {
				headers: {
					'content-type': 'multipart/form-data ',
					Authorization: `Bearer ${data?.access}`,
				},
			})
			setAudio(undefined)
			setList((prevState) => (prevState === null ? [result] : [result, ...prevState]))
			setLoading(false)
		} catch (err) {
			setList([])
			showError(decodeError(err, 'Ошибка генерации'))
			setLoading(false)
		}
	}

	const { data } = useSession()

	useEffect(() => {
		if (!data?.access) {
			return
		}
		setLoading(true)
		getAudioList(data?.access).then((res) => {
			setLoading(false)
			setList(res)
		})
	}, [data?.access])

	return (
		<>
			<input onChange={setMp} ref={ref} id='myfile' name='myfile' type='file' hidden accept='.mp3,.waw' />
			<TextField
				onFocus={() => ref.current!.click()}
				value={audio?.name || ''}
				fullWidth
				sx={{
					...styleInputWithoutBorderFocus,
				}}
				className={styles.search}
				placeholder={'Нажмите, чтобы выбрать аудиофайл или перетащите его сюда'}
				InputLabelProps={{
					style: {
						color: '#868686',
						lineHeight: '21px',
						fontSize: '14px',
						fontWeight: '400px',
						borderRadius: '13px',
					},
				}}
				InputProps={{
					startAdornment: (
						<Box sx={{ transform: 'rotate(28deg)', marginTop: 0.6 }}>
							<AttachFileIcon
								color='info'
								sx={{
									cursor: 'pointer',
									color: '#868686',
									width: 22,
									height: 22,
								}}
							/>
						</Box>
					),
					endAdornment: (
						<InputAdornment position='end'>
							<Stack direction='row' spacing={0} alignItems='center'>
								<Box>
									{!loading ? (
										<Image
											onClick={transcript}
											height={27}
											width={27}
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
			<Box className={styles2.list}>
				{list?.length === 0 ? (
					<Box sx={{ width: '100%' }} display='flex' justifyContent='center'>
						<Typography sx={{ width: 'auto', margin: '20px auto' }}>У вас пока нет расшифрованных записей</Typography>
					</Box>
				) : (
					<>
						{list?.map((el) => (
							<Card
								key={el.uid}
								transcribed_audio={el.transcribed_audio}
								uid={el.uid}
								audio_link={el.audio_link}
								audio_object_link={el.audio_object_link}
								created_at={el.created_at}
								is_translate={el.is_translate}
								target_language={el.target_language}
								remove={removeAudio}
							/>
						))}
					</>
				)}
			</Box>
			<Error error={error} open={Boolean(error)} />
		</>
	)
}
