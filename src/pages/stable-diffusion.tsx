import * as React from 'react'
import { Box, Stack } from '@mui/material'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { getSession, useSession } from 'next-auth/react'

import { getUserBalance } from '@/src/entities/balance'
import { Layout } from '@/src/main/layout'
import { useAppDispatch } from '@/src/main/store/store'
import { InputImagesModels, MessagesList, useAutoLoad } from '@/src/shared'
import { api } from '@/src/shared/api/endpoints'
import { API_HOST, API_URL, surpriseMePrompts } from '@/src/shared/lib/constants/constants'
import { getTypeDevice } from '@/src/shared/lib/helpers'
import { decodeError } from '@/src/shared/lib/helpers/decode-error'
import { useShowData } from '@/src/shared/lib/hooks'
import { ISDProps } from '@/src/shared/lib/types/types-sd'
import { FiltersSd as Filters } from '@/src/widgets/filters-sd'
import { TClipGuidancePresets, TGeneratingModel, TImageFormat, TSamplerTypes } from '@/src/widgets/filters-sd/lib/types'
import { Styles, styles } from '@/src/widgets/filters-sd/ui/filters'
import { ModelTopBar } from '@/src/widgets/top-bar-model'

type Result = {
	question: string
	link: string
	created_at: string
	resulting_balance?: number
}

type IResponseSD = {
	count: number
	next: string | null
	page_size: number
	previous: string | null
	results: Result[]
}

interface IPromptSD {
	prompt: string
	format_image: string
	samples: number
	cfg_scale: number
	clip_guidance_preset: 'FAST_BLUE' | 'FAST_GREEN' | 'Без фильтров' | 'SIMPLE' | 'SLOW' | 'SLOWER' | 'SLOWEST'
	sampler:
		| 'DDIM'
		| 'DDPM'
		| 'K_DPMPP_2M'
		| 'K_DPMPP_2S_ANCESTRAL'
		| 'K_DPM_2'
		| 'K_DPM_2_ANCESTRAL'
		| 'K_EULER'
		| 'K_EULER_ANCESTRAL'
		| 'K_HEUN'
		| 'K_LMS'
	seed: number
	steps: number
}

const formatImages: TImageFormat[] = ['512x512', '640x384', '384x640', '768x512', '512x768', '1024x1024']

const clipGuidancePresets: TClipGuidancePresets[] = ['Без фильтров', 'FAST_BLUE', 'FAST_GREEN', 'SIMPLE', 'SLOW', 'SLOWER', 'SLOWEST']

const samplerTypes: TSamplerTypes[] = [
	'DDIM',
	'DDPM',
	'K_DPMPP_2M',
	'K_DPMPP_2S_ANCESTRAL',
	'K_DPM_2',
	'K_DPM_2_ANCESTRAL',
	'K_EULER',
	'K_EULER_ANCESTRAL',
	'K_HEUN',
	'K_LMS',
]

export async function getServerSideProps(context: any): Promise<{ props: ISDProps }> {
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

const StableDiffusion: React.FC<ISDProps> = ({ device, token, favorites }) => {
	const desktop = device === 'desktop'

	const [input_value, set_inputValue] = React.useState<string>('')

	const [messages, setMessages] = React.useState<Result[]>([])

	const [loading, setLoading] = React.useState(false)

	const [dataWithoutImages, setDataWithoutImages] = React.useState<Omit<IResponseSD, 'results'>>({
		next: API_URL + '/ml_models/stable-diffusion?page=1',
		previous: null,
		page_size: 1000,
		count: 10,
	})

	const { status } = useSession()

	const [formatImage, setFormatImage] = React.useState<TImageFormat>('1024x1024')

	const [stepsImage, setStepsImage] = React.useState<number | string | Array<number | string>>(30)

	const [numberImages, setNumberImages] = React.useState<number | number[] | undefined>(1)

	const [sampleType, setSampleType] = React.useState<TSamplerTypes>('K_DPMPP_2M')

	const [clipGuidancePreset, setClipGuidancePreset] = React.useState<TClipGuidancePresets>('Без фильтров')

	const [cfgScale, setCfgScale] = React.useState<number | string | Array<number | string>>(7)

	const [generatingModel, setGeneratingModel] = React.useState<TGeneratingModel>('stable-diffusion-xl-beta-v2-2-2')

	const [drawerOpen, setDrawerOpen] = React.useState(false)

	const LazyMobileFilters = dynamic(() => import('@/src/widgets/filters-sd/ui/filters-mobile').then((res) => res.FiltersMobile))

	const LazyError = dynamic(() => import('@/src/shared').then((res) => res.Error), { ssr: false })

	const [isTranslate, setIsTranslate] = React.useState(true)

	const { error, showError } = useShowData()

	const [style, setStyle] = React.useState<Styles>(styles['Без стилей'])

	const dispatch = useAppDispatch()

	const [fetching, setFetching] = useAutoLoad(desktop)

	React.useEffect(() => {
		if (fetching) {
			api.getImagesSD(token, dataWithoutImages.next as string)
				.then((res) => {
					if (res) {
						setMessages((prev) => (desktop ? [...prev, ...res?.results] : [...prev, ...res?.results]))
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

	const sendInputToGetImage = () => {
		if (status === 'unauthenticated' || status === 'loading') {
			return
		}

		if (input_value.trim() === '') {
			showError('Напишите сообщение для генерации')
		}

		if (input_value.trim() !== '') {
			setLoading(true)
			axios.post<Result[]>(
				API_HOST + '/ml_models/stable-diffusion',
				{
					prompt: input_value,
					style: style === 'Без стилей' ? undefined : style,
					format_image: formatImage,
					samples: numberImages,
					cfg_scale: cfgScale,
					clip_guidance_preset: clipGuidancePreset === 'Без фильтров' ? 'NONE' : clipGuidancePreset,
					sampler: sampleType,
					steps: stepsImage,
					engine: generatingModel,
					translate_prompt: isTranslate,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
				.then(function ({ data }) {
					const newMessages = data.map((el) => {
						return {
							question: el.question,
							link: el.link,
							created_at: el.created_at,
						}
					})
					setMessages((prev) => {
						return [...newMessages, ...prev!]
					})
					setLoading(false)
					dispatch(getUserBalance(token))
				})
				.catch(function (error) {
					showError(decodeError(error, 'Ошибка генерации'))
					setLoading(false)
				})
		}
	}

	const resetSettings = () => {
		setFormatImage('512x512')
		setStepsImage(30)
		setNumberImages(1)
		setCfgScale(7)
		setClipGuidancePreset('Без фильтров')
		setSampleType('K_DPMPP_2M')
	}

	const wonderMe = () => {
		const random_text = surpriseMePrompts[Math.floor(Math.random() * surpriseMePrompts.length)]
		set_inputValue(random_text)
	}

	return (
		<Layout titlePage={'Stable Diffusion'} device={device}>
			{!desktop && <ModelTopBar title={'Stable-Diffusion'} favorites={favorites} device={device} token={token} />}
			<Stack
				direction='row'
				justifyContent='space-between'
				sx={{
					marginBottom: desktop ? 0 : 3,
					width: '98%',
					marginTop: desktop ? 3 : 0,
				}}
			>
				<Box
					sx={{
						width: desktop ? '80%' : '100%',
						marginLeft: desktop ? 1.5 : 0,
						display: 'flex',
						flexDirection: desktop ? 'column' : 'column-reverse',
					}}
				>
					<InputImagesModels
						value={input_value}
						onChange={(e) => set_inputValue(e.target.value)}
						loading={loading}
						requestImage={sendInputToGetImage}
						wonderMe={wonderMe}
						desktop={desktop}
						openFilters={() => setDrawerOpen(true)}
					/>
					<MessagesList images={messages} device={device} />
				</Box>
				{desktop && (
					<Box sx={{ width: '18%' }}>
						<Filters
							generatingModel={generatingModel}
							changeGeneratingModel={(e) => setGeneratingModel(e)}
							formatImage={formatImage}
							stepsImage={stepsImage}
							numberImages={numberImages}
							sampleType={sampleType}
							samplerTypes={samplerTypes}
							cfgScale={cfgScale}
							clipGuidancePreset={clipGuidancePreset}
							clipGuidancePresets={clipGuidancePresets}
							formatImages={formatImages}
							changeFormatImage={(e) => setFormatImage(e)}
							changeClipGuidancePreset={(e) => setClipGuidancePreset(e)}
							changeSampleType={(e) => setSampleType(e)}
							changeStepsImage={(e, current) => setStepsImage(current)}
							changeNumberImage={(e, current) => setNumberImages(current)}
							changeCfgScale={(e, current) => setCfgScale(current)}
							resetSettings={resetSettings}
							isTranslate={isTranslate}
							changeIsTranslate={() => setIsTranslate((prev) => !prev)}
							changeStyle={(e) => setStyle(e)}
							style={style}
							device={'desktop'}
							token={''}
						/>
					</Box>
				)}
				{!desktop && (
					<LazyMobileFilters
						generatingModel={generatingModel}
						changeGeneratingModel={(e) => setGeneratingModel(e)}
						formatImage={formatImage}
						stepsImage={stepsImage}
						numberImages={numberImages}
						sampleType={sampleType}
						samplerTypes={samplerTypes}
						cfgScale={cfgScale}
						clipGuidancePreset={clipGuidancePreset}
						clipGuidancePresets={clipGuidancePresets}
						formatImages={formatImages}
						changeFormatImage={(e) => setFormatImage(e)}
						changeClipGuidancePreset={(e) => setClipGuidancePreset(e)}
						changeSampleType={(e) => setSampleType(e)}
						changeStepsImage={(e, current) => setStepsImage(current)}
						changeNumberImage={(e, current) => setNumberImages(current)}
						changeCfgScale={(e, current) => setCfgScale(current)}
						resetSettings={resetSettings}
						device={'desktop'}
						isOpenDrawer={drawerOpen}
						onCloseDrawer={() => setDrawerOpen(false)}
						isTranslate={isTranslate}
						changeIsTranslate={() => setIsTranslate((prev) => !prev)}
						changeStyle={(e) => setStyle(e)}
						style={style}
						token={''}
					/>
				)}

				<LazyError error={error} open={Boolean(error)} />
			</Stack>
		</Layout>
	)
}

export default StableDiffusion
