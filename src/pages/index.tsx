import * as React from 'react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Box, Button, Checkbox, Chip, FormControlLabel, Stack, Tab, Tabs, Typography, useMediaQuery } from '@mui/material'
import Menu from '@mui/material/Menu'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '@/src/main/layout'
import { useAppSelector } from '@/src/main/store/store'
import { authOptions } from '@/src/pages/api/auth/[...nextauth]'
import { api } from '@/src/shared/api/endpoints'
import { API_HOST } from '@/src/shared/lib/constants/constants'
import { getAccessToken } from '@/src/shared/lib/helpers'
import { getTypeDevice } from '@/src/shared/lib/helpers'
import { TDevice } from '@/src/shared/lib/types/entities'
import { Card, UnActiveCard } from '@/src/shared/ui/card'

type ModelConfig = {
	model_type: string
	is_active: boolean
}

export interface INeuronModel {
	uid: string
	companies: string
	description: string
	image_link: string
	languages: string[]
	link: string
	model: string
	model_config: ModelConfig
	title: string
	is_favourite?: boolean
}

interface IMain {
	data: INeuronModel[]
	favorites: INeuronModel[]
	deviceType: TDevice
	token: string | null
	toggleTheme?: React.MouseEventHandler<HTMLButtonElement>
}

type TFilters = 'Все' | 'Текст' | 'Изображения'

interface IFiltersState {
	search: string
	isAll: boolean
	isText: boolean
	isImage: boolean
	isBase: boolean
	isTrained: boolean
	isRussian: boolean
	isEnglish: boolean
	isOtherLang: boolean
	isGetByApi: boolean
}

type TCheckbox = {
	title: string
	func: string
	titleInInitialState: string
}

type TallFilters = {
	Функции: TCheckbox[]
	Модель: TCheckbox[]
	Язык: TCheckbox[]
}
const allFilters: TallFilters = {
	Функции: [
		{ title: 'Текст', func: 'changeIsText', titleInInitialState: 'isText' },
		{
			title: 'Изображения',
			func: 'changeIsImage',
			titleInInitialState: 'isImage',
		},
	],
	Модель: [
		{
			title: 'Базовая',
			func: 'changeIsBase',
			titleInInitialState: 'isBase',
		},
		{
			title: 'Дообученная',
			func: 'changeIsTrained',
			titleInInitialState: 'isTrained',
		},
	],
	Язык: [
		{
			title: 'Русский',
			func: 'changeIsRussian',
			titleInInitialState: 'isRussian',
		},
		{
			title: 'Английский',
			func: 'changeIsEnglish',
			titleInInitialState: 'isEnglish',
		},
		{
			title: 'Другие',
			func: 'changeIsOther',
			titleInInitialState: 'isOtherLang',
		},
	],
}

export async function getServerSideProps(context: any): Promise<{ props: IMain }> {
	const deviceType = getTypeDevice(context)

	const token = (await getAccessToken(context.req)) || null

	const session = await getServerSession(context.req, context.res, authOptions)

	const models = await api.getAllModels(token)

	const favorites = await api.getFavoritesModel(token, session)

	return {
		props: {
			...(await serverSideTranslations(context.locale, ['common'])),
			data: models,
			deviceType,
			token,
			favorites,
		},
	}
}

export const Main: React.FC<IMain> = ({ data, deviceType, token, favorites }) => {
	const { data: userData } = useSession()

	const [subTabValue, setSubTabValue] = React.useState(0)

	const [neuron_models, setNeuronModels] = React.useState<INeuronModel[]>(data)

	const [favoritesModels, setFavoritesModels] = React.useState<INeuronModel[]>(favorites)

	const [filteredModels, setFilteredModels] = React.useState<INeuronModel[] | undefined>(neuron_models)

	const theme = useAppSelector((state) => state.theme.theme)

	const [, setCookie] = useCookies()

	const { query } = useRouter()

	React.useEffect(() => {
		Object.entries(query).forEach(([key, value]) => setCookie(key, value))
	}, [])

	const initialState: IFiltersState = {
		search: '',
		isAll: true,
		isText: false,
		isImage: false,
		isBase: false,
		isTrained: false,
		isRussian: false,
		isEnglish: false,
		isOtherLang: false,
		isGetByApi: false,
	}

	function reducer(state: any, action: any) {
		switch (action.type) {
			case 'changeIsAll':
				return {
					...state,
					isAll: action.payload,
					isText: false,
					isImage: false,
				}
			case 'changeSearch':
				return { ...state, search: action.payload }
			case 'changeIsText':
				return {
					...state,
					isText: action.payload,
					isAll: false,
					isImage: false,
				}
			case 'changeIsImage':
				return {
					...state,
					isImage: action.payload,
					isAll: false,
					isText: false,
				}
			case 'changeIsBase':
				return { ...state, isBase: action.payload }
			case 'changeIsTrained':
				return { ...state, isTrained: action.payload }
			case 'changeIsRussian': {
				return { ...state, isRussian: action.payload }
			}
			case 'changeIsEnglish': {
				return { ...state, isEnglish: action.payload }
			}
			case 'changeIsOther': {
				return { ...state, isOtherLang: action.payload }
			}
			default:
				throw new Error()
		}
	}

	const [filters, dispatch] = React.useReducer(reducer, initialState)

	useEffect(() => {
		if (!filters.isText && !filters.isImage) {
			dispatch({ type: 'changeIsAll', payload: true })
		}
	}, [filters.isText, filters.isImage])

	const [filtersMore, setFiltersMore] = React.useState<null | HTMLElement>(null)

	const openFilters = Boolean(filtersMore)
	const openMenuFilters = (event: React.MouseEvent<HTMLButtonElement>) => {
		setFiltersMore(event.currentTarget)
	}

	const closeMenuFilters = () => {
		setFiltersMore(null)
	}

	const subTab_handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setSubTabValue(newValue)
	}

	const addToFavorites = async (model_id: string) => {
		if (!token) {
			return
		}

		try {
			const { data, status } = await axios.put(
				API_HOST + `/ml_models/${userData!.user?.name}`,
				{
					uid: model_id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (status === 201) {
				setNeuronModels((prevState) =>
					prevState.map((el) => {
						if (el.uid === model_id) {
							el.is_favourite = true
						}
						return el
					})
				)
				setFavoritesModels(data)
			}
		} catch (err) {}
	}

	const deleteFromFavorites = async (model_id: string) => {
		if (!token) {
			return
		}

		try {
			const { status, data } = await axios.delete(API_HOST + `/ml_models/${userData!.user?.name}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				data: {
					uid: model_id,
				},
			})

			if (status === 200) {
				setNeuronModels((prevState) =>
					prevState.map((el) => {
						if (el.uid === model_id) {
							el.is_favourite = false
						}
						return el
					})
				)
				setFavoritesModels(data)
			}
		} catch (err) {}
	}

	const filtersByAllField = () => {
		setFilteredModels(
			neuron_models
				.filter((el) => {
					if (filters.isAll) {
						return true
					}

					if (filters.isImage && filters.isText) {
						return el.model_config.model_type === 'image' || el.model_config.model_type === 'text'
					}

					if (filters.isText) {
						return el.model_config.model_type === 'text'
					}

					if (filters.isImage) {
						return el.model_config.model_type === 'image'
					}
				})
				.filter((el) => {
					if (!filters.isBase && !filters.isTrained) {
						return true
					}
					if (filters.isBase && filters.isTrained) {
						return true
					}
					if (filters.isBase) {
						return el.model === 'Базовая'
					}
					if (filters.isTrained) {
						return el.model === 'Дообученная'
					}
				})
				.filter((el) => el.title.toLowerCase().includes(filters.search))
				.filter((el) => {
					if (!filters.isRussian && !filters.isEnglish && !filters.isOtherLang) {
						return el
					}

					if (filters.isRussian && filters.isEnglish) {
						return (
							el.languages.map((el) => el).includes('RU') &&
							el.languages.map((el) => el).includes('ENG') &&
							el.languages.map((el) => el).includes('Другие')
						)
					}

					if (filters.isOtherLang) {
						return el.languages.map((el) => el).includes('Другие')
					}

					if (filters.isRussian) {
						return el.languages.map((el) => el).includes('RU')
					}

					if (filters.isEnglish) {
						return el.languages.map((el) => el).includes('ENG')
					}

					return el
				})
		)
	}

	const matches = useMediaQuery('(max-width:1840px)')

	React.useEffect(() => {
		filtersByAllField()
	}, [filters])

	const { t } = useTranslation()

	return (
		<Layout titlePage={t('main-page')} device={deviceType}>
			<Box sx={{ width: '97%', margin: '0 auto' }}>
				<Box sx={{ marginTop: 1 }}>
					<Stack
						direction='row'
						spacing={deviceType === 'desktop' ? 1 : 0}
						alignItems='center'
						justifyContent='space-between'
						sx={{
							marginBottom: deviceType === 'desktop' ? 1.5 : 0.1,
							marginLeft: 1.5,
						}}
					>
						<Tabs
							value={subTabValue}
							onChange={subTab_handleChange}
							textColor='inherit'
							TabIndicatorProps={{
								style: {
									backgroundColor: 'transparent',
								},
							}}
							sx={{ height: 55, justifyContent: 'flex-start' }}
							aria-label='basic tabs example'
						>
							<Tab
								label='Каталог'
								/* @ts-ignore */
								icon={
									deviceType !== 'mobile' && (
										<Image
											height={16}
											width={16}
											alt={''}
											src={subTabValue == 0 ? '/svg/sub_menu/catalog.svg' : '/svg/sub_menu/catalog_off.svg'}
										/>
									)
								}
								iconPosition='start'
								sx={{
									textTransform: 'none',
									color: subTabValue === 0 ? '#7F7DF3' : '#868686',
									fontSize: deviceType !== 'desktop' ? '19px' : '18px',
									paddingLeft: 0,
									marginLeft: deviceType === 'mobile' ? '1px' : 0,
								}}
							/>
							{token && (
								<Tab
									label='Избранное'
									/* @ts-ignore */
									icon={
										deviceType !== 'mobile' && (
											<Image
												height={16}
												width={16}
												alt={''}
												src={subTabValue == 1 ? '/svg/sub_menu/favourite.svg' : '/svg/sub_menu/favourite_off.svg'}
											/>
										)
									}
									iconPosition='start'
									sx={{
										textTransform: 'none',
										color: subTabValue === 1 ? '#7F7DF3' : '#868686',
										fontSize: deviceType !== 'desktop' ? '19px' : '18px',
										paddingLeft: 0,
										margin: 0,
									}}
								/>
							)}
						</Tabs>
						<Stack
							direction='row'
							spacing={1}
							alignItems='center'
							justifyContent='center'
							sx={{
								marginTop: deviceType !== 'mobile' ? 2 : 0,
								borderRadius: 0,
							}}
						>
							{deviceType !== 'mobile' && (
								<Chip
									label='Все'
									variant='outlined'
									sx={{
										borderRadius: '11px',
										border: filters.isAll ? '1px solid #7F7DF3' : '1px solid transparent',
										color: filters.isAll ? '#7F7DF3' : '#868686',
									}}
									onClick={() =>
										dispatch({
											type: 'changeIsAll',
											payload: true,
										})
									}
								/>
							)}
							{deviceType !== 'mobile' && (
								<Chip
									label='Текст'
									onClick={() =>
										dispatch({
											type: 'changeIsText',
											payload: !filters.isText,
										})
									}
									variant='outlined'
									sx={{
										borderRadius: '11px',
										border: filters.isText ? '1px solid #7F7DF3' : '1px solid transparent',
										color: filters.isText ? '#7F7DF3' : '#868686',
									}}
								/>
							)}
							{deviceType !== 'mobile' && (
								<Chip
									label='Изображения'
									variant='outlined'
									sx={{
										borderRadius: '11px',
										border: filters.isImage ? '1px solid #7F7DF3' : '1px solid transparent',
										color: filters.isImage ? '#7F7DF3' : '#868686',
									}}
									onClick={() =>
										dispatch({
											type: 'changeIsImage',
											payload: !filters.isImage,
										})
									}
								/>
							)}
							<Button
								id='filter-button'
								aria-controls={openFilters ? 'filter-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={openFilters ? 'true' : undefined}
								onClick={openMenuFilters}
							>
								<Image
									priority
									style={{
										marginLeft: deviceType === 'desktop' ? 0 : 30,
									}}
									src='/filter.svg'
									height={20}
									width={20}
									alt='Filter'
								/>
							</Button>
							<Menu
								id='filter-menu'
								anchorEl={filtersMore}
								open={openFilters}
								onClose={closeMenuFilters}
								MenuListProps={{
									'aria-labelledby': 'filter-button',
								}}
								sx={{ padding: 10 }}
								PaperProps={{
									style: {
										maxHeight: 48 * 6.5,
										width: '22ch',
										borderRadius: 15,
									},
									elevation: 0,
									sx: {
										backgroundColor: theme === 'light' ? '' : '#3D3D3D',
										filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
										mt: 1,
										padding: 1,
										'& .MuiAvatar-root': {
											width: 32,
											height: 32,
											ml: -0.5,
											mr: 1,
										},
									},
								}}
								transformOrigin={{
									horizontal: 'right',
									vertical: 'top',
								}}
								anchorOrigin={{
									horizontal: 'right',
									vertical: 'bottom',
								}}
							>
								{Object.entries(allFilters).map(([key, value]) => {
									return (
										<Box key={key}>
											<Typography
												key={key}
												variant='body2'
												sx={{
													color: '#868686',
													fontSize: '13px',
													fontWeight: 600,
													marginTop: 0.1,
												}}
											>
												{key}:
											</Typography>
											{value.map((el) => {
												return (
													<FormControlLabel
														control={
															<Checkbox
																size='small'
																sx={{
																	color: '#7F7DF3',
																	'&.Mui-checked': {
																		color: '#7F7DF3',
																	},
																}}
																onChange={(e) =>
																	dispatch({
																		type: el.func,
																		payload: e.target.checked,
																	})
																}
																checked={filters[el.titleInInitialState]}
															/>
														}
														label={el.title}
														key={el.title}
														sx={{
															'.MuiFormControlLabel-label': {
																fontSize: 14,
																color: '#868686',
																marginLeft: -0.5,
															},
														}}
													/>
												)
											})}
										</Box>
									)
								})}
							</Menu>
						</Stack>
					</Stack>
					<Box sx={{ position: 'relative' }}>
						<input
							value={filters.search}
							style={{
								width: '100%',
								padding: '20px 15px',
								fontSize: 15,
								backgroundColor: theme === 'light' ? '#F8F8F8' : '#4B4B4B',
								border: 'none',
								borderRadius: '13px',
								marginBottom: '15px',
								color: '#A1A1A1',
							}}
							placeholder='Поиск по продуктам'
							onChange={(e) =>
								dispatch({
									type: 'changeSearch',
									payload: e.target.value,
								})
							}
						/>
						<Image src={'/search.svg'} width={20} height={20} style={{ position: 'absolute', right: 15, top: 18 }} alt={''} />
					</Box>
				</Box>
				<Box
					sx={{
						marginRight: 0,
						width: '100%',
						display: 'flex',
						flexWrap: 'wrap',
						'::-webkit-scrollbar': {
							display: 'none',
						},
					}}
				>
					<Box
						sx={{
							flexWrap: 'wrap',
							margin: '0 auto',
							display: 'flex',
							justifyContent: matches ? 'center' : 'start',
							width: '100%',
						}}
					>
						{(subTabValue === 0 ? filteredModels : favoritesModels)?.map((model) => {
							return model.model_config.is_active ? (
								<Box
									sx={{
										width: deviceType !== 'desktop' ? '100%' : '420px',
										marginRight: deviceType !== 'desktop' ? 0 : 3,
									}}
									key={model.title}
								>
									<Card
										uid={model.uid}
										title={model.title}
										link={model.link}
										model={model.model}
										description={model.description}
										image_link={model.image_link}
										companies={model.companies}
										languages={model.languages}
										model_config={model.model_config}
										device={deviceType}
										is_favourite={model.is_favourite}
										addToFavorites={addToFavorites}
										deleteFromFavorites={deleteFromFavorites}
									/>
								</Box>
							) : (
								<Box
									sx={{
										width: deviceType !== 'desktop' ? '100%' : '420px',
										marginRight: deviceType !== 'desktop' ? 0 : 3,
									}}
									key={model.title}
								>
									<UnActiveCard
										uid={model.uid}
										title={model.title}
										link={model.link}
										model={model.model}
										description={model.description}
										image_link={model.image_link}
										companies={model.companies}
										languages={model.languages}
										model_config={model.model_config}
										device={deviceType}
										is_favourite={model.is_favourite}
									/>
								</Box>
							)
						})}
					</Box>
				</Box>
			</Box>
		</Layout>
	)
}

export default Main
