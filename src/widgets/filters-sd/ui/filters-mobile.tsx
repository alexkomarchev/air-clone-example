import React, { useState } from 'react'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import { Box, Button, Drawer, Stack, Typography } from '@mui/material'

import { useAppSelector } from '@/src/main/store/store'
import { Select, SwitchCustom } from '@/src/shared'
import { Slider } from '@/src/shared'
import { SelectUI } from '@/src/shared/ui/select'
import { PrettoSlider, PrettoSliderDark } from '@/src/widgets/filters-gpt/ui/filters'
import { GeneratingModel } from '@/src/widgets/filters-sd/lib/constants'
import { ISDFilters, TClipGuidancePresets, TGeneratingModel, TImageFormat, TSamplerTypes } from '@/src/widgets/filters-sd/lib/types'
import { Styles,styles } from '@/src/widgets/filters-sd/ui/filters'

interface ISDFiltersMobile extends ISDFilters {
	isOpenDrawer: boolean
	onCloseDrawer: () => void
}

export const FiltersMobile: React.FC<ISDFiltersMobile> = ({
	stepsImage,
	numberImages,
	formatImage,
	cfgScale,
	clipGuidancePreset,
	sampleType,
	formatImages,
	changeFormatImage,
	changeClipGuidancePreset,
	clipGuidancePresets,
	samplerTypes,
	changeSampleType,
	changeStepsImage,
	changeNumberImage,
	changeCfgScale,
	resetSettings,
	onCloseDrawer,
	isOpenDrawer,
	isTranslate,
	changeIsTranslate,
	style,
	changeStyle,
	generatingModel,
	changeGeneratingModel,
}) => {
	const [showConfigure, setShowConfigure] = useState(false)

	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Drawer
			anchor={'bottom'}
			open={isOpenDrawer}
			onClose={onCloseDrawer}
			sx={{
				width: '100%',
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
			<Stack direction='column' sx={{ width: '100%', marginLeft: 3, marginBottom: 1.5 }} spacing={2}>
				<Box width='90%'>
					<Select
						size={'small'}
						title={'Размер изображения'}
						value={formatImage}
						onChange={(e) => changeFormatImage(e.target.value as TImageFormat)}
						list={formatImages}
					/>
				</Box>

				<Box width='90%'>
					<SelectUI
						size={'small'}
						title={'Стиль'}
						value={style}
						onChange={(e) => changeStyle(e.target.value as Styles)}
						list={Object.values(styles)}
					/>
				</Box>

				<Box width='90%'>
					<SelectUI
						size='small'
						title={'Генеративная модель'}
						value={generatingModel}
						onChange={(e) => changeGeneratingModel(e.target.value as TGeneratingModel)}
						list={Object.values(GeneratingModel).filter((v) => isNaN(Number(v)))}
					/>
				</Box>

				<Box width='88%'>
					<Slider
						title={'Количество изображений'}
						value={numberImages}
						onChange={(e, cur) => changeNumberImage(e, cur)}
						max={10}
						min={1}
						step={1}
					/>
				</Box>

				<Button
					startIcon={<SettingsSuggestIcon />}
					style={{ marginTop: '10px' }}
					variant='contained'
					sx={{
						width: '90%',
						backgroundColor: '#7F7DF3',
						fontSize: '14px',
						':hover': { backgroundColor: '#7F7DF3' },
					}}
					onClick={() => setShowConfigure((prevState) => !prevState)}
				>
					{showConfigure ? 'Скрыть ' : 'Показать '}
					расширенные настройки
				</Button>
				{showConfigure && (
					<>
						<Box width='90%'>
							<Box display='flex' alignItems='center' justifyContent='space-between'>
								<Typography
									sx={{
										fontSize: '14px',
									}}
								>
									Переводить запрос
								</Typography>
								<SwitchCustom checked={isTranslate} onChange={changeIsTranslate} />
							</Box>
						</Box>
						<Box width='90%'>
							<Select
								size={'small'}
								title={'clip_guidance_preset'}
								value={clipGuidancePreset}
								onChange={(e) => changeClipGuidancePreset(e.target.value as TClipGuidancePresets)}
								list={clipGuidancePresets}
							/>
						</Box>

						<Box width='90%'>
							<Select
								size={'small'}
								title={'sampler'}
								value={sampleType}
								onChange={(e) => changeSampleType(e.target.value as TSamplerTypes)}
								list={samplerTypes}
							/>
						</Box>
						<Box width='88%'>
							<Slider
								title={'Шаги для обработки'}
								value={typeof stepsImage === 'number' ? stepsImage : 30}
								onChange={(e, cur) => changeStepsImage(e, cur)}
								max={150}
								min={10}
								step={1}
							/>
						</Box>

						<Box width='88%'>
							<Slider
								title={'CFG scale'}
								value={typeof cfgScale === 'number' ? cfgScale : 7}
								onChange={(e, cur) => changeCfgScale(e, cur)}
								max={20}
								min={1}
								step={1}
							/>
						</Box>
					</>
				)}

				<Typography
					variant='body2'
					onClick={resetSettings}
					sx={{
						color: '#FF4170',
						lineHeight: '19.6px',
						fontSize: '14px',
						fontWeight: '400px',
						marginTop: 0.2,
						'&:hover': {
							cursor: 'pointer',
						},
					}}
				>
					Сбросить настройки
				</Typography>
			</Stack>
		</Drawer>
	)
}
