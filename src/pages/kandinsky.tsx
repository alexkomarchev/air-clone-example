import * as React from 'react'
import { useEffect, useState } from 'react'
import { Box, Drawer, InputAdornment, TextField, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import axios, { AxiosResponse } from 'axios'
import Image from 'next/image'
import { getSession, useSession } from 'next-auth/react'

import { getUserBalance } from '@/src/entities/balance'
import { Layout } from '@/src/main/layout'
import { useAppDispatch, useAppSelector } from '@/src/main/store/store'
import { Error, MessagesList, Slider, SwitchCustom, useAutoLoad, useShowData } from '@/src/shared'
import { Input } from '@/src/shared'
import { api, Wrap, WrapResponse } from '@/src/shared/api/endpoints'
import { API_URL } from '@/src/shared/lib/constants'
import { getTypeDevice } from '@/src/shared/lib/helpers'
import { decodeError } from '@/src/shared/lib/helpers/decode-error'
import { IDalleProps } from '@/src/shared/lib/types/types-dalle'
import { styleInputWithoutBorderFocus } from '@/src/shared/ui/input'
import stylesSearch from '@/src/shared/ui/search/search.module.scss'
import { SelectUI } from '@/src/shared/ui/select'
import { ModelTopBar } from '@/src/widgets/top-bar-model'

export async function getServerSideProps(context: any): Promise<{ props: IDalleProps }> {
	const device = getTypeDevice(context)

	const { req } = context

	const session = await getSession({ req })

	const token = session?.access || null

	const favorites = await api.getFavoritesModel(token, session)

	return {
		props: {
			device,
			token,
			favorites,
		},
	}
}

type Request = {
	model: string
	style: string
	inputs: string
	negative_prompt: string
	inference_steps: number
}

type Response = {
	inputs: string
	model: string
	negative_prompt: string
	inference_steps: number
	link: string
}

const getImages = async (token: string | null, url: string): Promise<WrapResponse<Response> | null> => {
	try {
		const { data } = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return data
	} catch (e) {
		return null
	}
}

const Kandinsky: React.FC<IDalleProps> = ({ device, favorites, token }) => {
	const desktop = device === 'desktop'

	const theme = useAppSelector((state) => state.theme.theme)

	const [input, setInput] = useState('')

	const [images, setImages] = useState<Response[] | []>([])

	const [loading, setLoading] = useState(false)

	const [negativePrompt, setNegativePrompt] = useState(' ')

	const [inferenceSteps, setInferenceSteps] = useState(30)

	const [width, setWidth] = useState(1024)

	const [height, setHeight] = useState(1024)

	const [number, setNumber] = useState(1)

	const { error, showError } = useShowData()

	const [isOpenDrawer, setIsOpenDrawer] = useState(false)

	const { data: session, status } = useSession()

	const dispatch = useAppDispatch()

	const [isTranslate, setIsTranslate] = useState(true)

	const [dataWithoutImages, setDataWithoutImages] = useState<Omit<Wrap, 'results'>>({
		next: API_URL + '/ml_models/kandinsky',
		previous: null,
		page_size: 1000,
		count: 10,
	})

	const [fetching, setFetching] = useAutoLoad(desktop)

	React.useEffect(() => {
		if (fetching) {
			getImages(token, dataWithoutImages.next as string)
				.then((res) => {
					if (res) {
						setImages((prev) => (desktop ? [...prev, ...res?.results] : [...prev, ...res?.results]))
						setDataWithoutImages({
							next: res.next,
							count: res.count,
							page_size: res.page_size,
							previous: res.previous,
						})
					}
				})
				.finally(() => setFetching(false))
		}
	}, [fetching])

	const generateImage = async () => {
		if (status !== 'authenticated') {
			showError('Пожалуйста авторизуйтесь')
		}

		if (input.trim() === '') {
			showError('Введите запрос')
		}

		try {
			setLoading(true)
			const { data } = await axios.post<Request, AxiosResponse<Response[]>>(
				API_URL + '/ml_models/kandinsky',
				{
					prompt: input,
					inference_steps: inferenceSteps,
					translated_prompt: isTranslate,
					num_outputs: number,
					width,
					height,
					negative_prompt: negativePrompt,
				},
				{
					headers: {
						Authorization: `Bearer ${session?.access}`,
					},
				}
			)

			setImages((prev) => [...data, ...prev!])
			dispatch(getUserBalance(token))
			setLoading(false)
		} catch (e) {
			showError(decodeError(e, 'Ошибка генерации'))
			setLoading(false)
		}
	}

	return (
		<Layout titlePage={'Kandinsky'} device={device}>
			{!desktop && <ModelTopBar token={token} title={'Kandinsky'} favorites={favorites} device={device} />}
			<Box
				display={'flex'}
				justifyContent='space-between'
				flexDirection={desktop ? 'row' : 'column-reverse'}
				sx={{ marginBottom: desktop ? 0 : 3, width: '98%', marginTop: desktop ? 3 : 0 }}
			>
				<Box
					sx={{
						width: desktop ? '80%' : '100%',
						marginLeft: desktop ? 1.5 : 0,
						display: 'flex',
						flexDirection: desktop ? 'column' : 'column-reverse',
					}}
				>
					<Stack alignItems='center'>
						<TextField
							fullWidth
							className={stylesSearch.search}
							label={'Введите описание изображения'}
							sx={{
								...styleInputWithoutBorderFocus,
							}}
							onKeyDown={(e: any) => {
								if (e.key === 'Enter') {
									generateImage()
								}
							}}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							InputLabelProps={{
								style: {
									color: '#868686',
									lineHeight: '21px',
									fontSize: '15px',
									fontWeight: '400px',
									borderRadius: '13px',
								},
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<Stack direction='row' spacing={0} alignItems='center'>
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
														onClick={() => setIsOpenDrawer(true)}
														height={21}
														width={21}
														alt='Error'
													/>
												</IconButton>
											)}
											<Box onClick={generateImage}>
												{!loading ? (
													<Image
														height={30}
														width={30}
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
					</Stack>
					<MessagesList device={device} images={images} />
				</Box>
				{desktop && (
					<Box sx={{ width: '18%' }}>
						<Box sx={{ marginTop: 1 }}>
							<Slider
								title={'Количество шагов'}
								value={inferenceSteps}
								max={150}
								min={10}
								step={1}
								onChange={(e: any) => setInferenceSteps(e.target.value)}
							/>
						</Box>
						<Box sx={{ marginTop: 1 }}>
							<Slider
								title={'Количество изображений'}
								value={number}
								max={4}
								min={1}
								step={1}
								onChange={(e: any) => setNumber(e.target.value)}
							/>
						</Box>
						<Box sx={{ marginTop: 1 }}>
							<SelectUI
								size='small'
								title={'Ширина'}
								value={width}
								onChange={(e) => setWidth(+e.target.value)}
								list={[384, 512, 576, 640, 704, 768, 960, 1024, 1152, 1280, 1536, 1792, 2048]}
							/>
						</Box>
						<Box sx={{ marginTop: 1 }}>
							<SelectUI
								size='small'
								title={'Высота'}
								value={height}
								onChange={(e) => setHeight(+e.target.value)}
								list={[384, 512, 576, 640, 704, 768, 960, 1024, 1152, 1280, 1536, 1792, 2048]}
							/>
						</Box>
						<Box sx={{ marginTop: 1 }}>
							<Box sx={{ padding: '0px 5px' }} display='flex' alignItems='center' justifyContent='space-between'>
								<Typography
									sx={{
										fontSize: '14px',
									}}
								>
									Переводить запрос
								</Typography>
								<SwitchCustom checked={isTranslate} onChange={() => setIsTranslate((prev) => !prev)} />
							</Box>
						</Box>
						<Box sx={{ marginTop: 2.5 }}>
							<Typography
								sx={{
									fontSize: '14px',
									marginLeft: 0.7,
									marginBottom: 0.5,
								}}
							>
								Запрос для исключения из генерации
							</Typography>
							<Input value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)} size='small' />
						</Box>
					</Box>
				)}
				{isOpenDrawer && (
					<Drawer
						anchor={'bottom'}
						open={isOpenDrawer}
						onClose={() => setIsOpenDrawer(false)}
						sx={{
							borderRadius: 10,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
						PaperProps={{
							sx: {
								borderRadius: '15px 15px 0px 0px',
								padding: '15px 8px',
								backgroundColor: theme === 'light' ? 'white' : '#373737',
							},
						}}
					>
						<Box sx={{ marginTop: 1 }}>
							<Slider
								title={'Количество шагов'}
								value={inferenceSteps}
								max={150}
								min={10}
								step={1}
								onChange={(e: any) => setInferenceSteps(e.target.value)}
							/>
						</Box>
						<Box sx={{ marginTop: 1 }}>
							<Slider
								title={'Количество изображений'}
								value={number}
								max={4}
								min={1}
								step={1}
								onChange={(e: any) => setNumber(e.target.value)}
							/>
						</Box>
						<Box sx={{ marginTop: 1 }}>
							<SelectUI
								size='small'
								title={'Ширина'}
								value={width}
								onChange={(e) => setWidth(+e.target.value)}
								list={[384, 512, 576, 640, 704, 768, 960, 1024, 1152, 1280, 1536, 1792, 2048]}
							/>
						</Box>
						<Box sx={{ marginTop: 1 }}>
							<SelectUI
								size='small'
								title={'Высота'}
								value={height}
								onChange={(e) => setHeight(+e.target.value)}
								list={[384, 512, 576, 640, 704, 768, 960, 1024, 1152, 1280, 1536, 1792, 2048]}
							/>
						</Box>
						<Box sx={{ marginTop: 1 }}>
							<Box sx={{ padding: '0px 5px' }} display='flex' alignItems='center' justifyContent='space-between'>
								<Typography
									sx={{
										fontSize: '14px',
									}}
								>
									Переводить запрос
								</Typography>
								<SwitchCustom checked={isTranslate} onChange={() => setIsTranslate((prev) => !prev)} />
							</Box>
						</Box>
						<Box sx={{ marginTop: 2.5 }}>
							<Typography
								sx={{
									fontSize: '14px',
									marginLeft: 0.7,
									marginBottom: 0.5,
								}}
							>
								Запрос для исключения из генерации
							</Typography>
							<Input value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)} size='small' />
						</Box>
					</Drawer>
				)}
				<Error error={error} open={Boolean(error)} />
			</Box>
		</Layout>
	)
}

export default Kandinsky
