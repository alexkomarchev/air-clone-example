import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import { getSession, useSession } from 'next-auth/react'

import { getUserBalance } from '@/src/entities/balance'
import { Layout } from '@/src/main/layout'
import { useAppDispatch } from '@/src/main/store/store'
import { DalleFilterMenu, Error, InputImagesModels, Slider, useAutoLoad } from '@/src/shared'
import { MessagesList } from '@/src/shared'
import { api, Wrap } from '@/src/shared/api/endpoints'
import { API_HOST, API_URL, surpriseMePrompts } from '@/src/shared/lib/constants/constants'
import { getTypeDevice } from '@/src/shared/lib/helpers'
import { decodeError } from '@/src/shared/lib/helpers/decode-error'
import { useShowData } from '@/src/shared/lib/hooks'
import { IDalleProps, IImagesResponse } from '@/src/shared/lib/types/types-dalle'
import { SelectUI } from '@/src/shared/ui/select'
import { ModelTopBar } from '@/src/widgets/top-bar-model'

type TFormatImage = '256x256' | '512x512' | '1024x1024'

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

const Dalle: React.FC<IDalleProps> = ({ device, token, favorites }) => {
	const [input, setInput] = React.useState<string>('')

	const [imagesResponse, setImagesResponse] = React.useState<IImagesResponse[] | []>([])

	const [loading, setLoading] = React.useState(false)

	const [format, setFormat] = React.useState<TFormatImage>('512x512')

	const [numberImages, setNumberImages] = React.useState<number | number[] | undefined>(1)

	const [dataWithoutImages, setDataWithoutImages] = useState<Omit<Wrap, 'results'>>({
		next: API_URL + '/ml_models/dalle',
		previous: null,
		page_size: 1000,
		count: 10,
	})

	const desktop = device === 'desktop'

	const [fetching, setFetching] = useAutoLoad(desktop)

	React.useEffect(() => {
		if (fetching) {
			api.getImagesDalle(token, dataWithoutImages.next as string)
				.then((res) => {
					if (res) {
						setImagesResponse((prev) => (desktop ? [...prev, ...res?.results] : [...prev, ...res?.results]))
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

	const { error, showError } = useShowData()

	const { status } = useSession()

	const dispatch = useAppDispatch()

	const wonderMe = () => {
		const random_text = surpriseMePrompts[Math.floor(Math.random() * surpriseMePrompts.length)]
		setInput(random_text)
	}
	const sendInputToGetImage = () => {
		if (status === 'unauthenticated' || status === 'loading') {
			showError('Войдите в аккаунт, чтобы пользоваться моделью')
			return
		}

		if (input.trim() === '') {
			showError('Напишите сообщение для генерации')
			return
		}

		if (input.trim() !== '') {
			setLoading(true)
			axios.post(
				API_HOST + '/ml_models/dalle',
				{
					question: input,
					format_image: format,
					number_images: numberImages,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
				.then(function (response) {
					setInput('')
					setLoading(false)
					setImagesResponse((prevState) => {
						return [...response.data, ...prevState!]
					})
					dispatch(getUserBalance(token))
				})
				.catch(function (err) {
					showError(decodeError(err, 'Ошибка генерации'))
					setLoading(false)
				})
		}
	}

	const [anchorElDalleFilter, setAnchorElDalleFilter] = React.useState<null | HTMLElement>(null)

	return (
		<Layout titlePage={'Dalle'} device={device}>
			{!desktop && <ModelTopBar title={'Dalle'} favorites={favorites} device={device} token={token} />}
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
						<InputImagesModels
							openFilters={(e) => setAnchorElDalleFilter(e.currentTarget)}
							desktop={desktop}
							wonderMe={wonderMe}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							loading={loading}
							requestImage={sendInputToGetImage}
							count={numberImages as number}
							quality={format}
						/>
					</Stack>
					<MessagesList device={device} images={imagesResponse} />
				</Box>
				{desktop && (
					<Box sx={{ width: '18%' }}>
						<SelectUI
							title={'Формат'}
							value={format}
							onChange={(e) => setFormat(e.target.value as TFormatImage)}
							list={['256x256', '512x512', '1024x1024']}
						/>
						<Slider
							title={'Количество изображений'}
							value={numberImages}
							onChange={(e, cur) => setNumberImages(cur)}
							max={10}
							min={1}
							step={1}
						/>
					</Box>
				)}
				<DalleFilterMenu
					anchorEl={anchorElDalleFilter}
					open={Boolean(anchorElDalleFilter)}
					closeMenu={() => setAnchorElDalleFilter(null)}
					format={format}
					changeFormat={(e: TFormatImage) => setFormat(e)}
					numberImages={numberImages}
					sliderChange={(e: any, cur: any) => setNumberImages(cur)}
				/>
				<Error error={error} open={Boolean(error)} />
			</Box>
		</Layout>
	)
}

export default Dalle
