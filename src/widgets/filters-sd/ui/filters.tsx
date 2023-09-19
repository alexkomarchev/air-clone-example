import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

import { Slider, SwitchCustom } from '@/src/shared'
import { SelectUI } from '@/src/shared/ui/select'
import { GeneratingModel } from '@/src/widgets/filters-sd/lib/constants'
import { ISDFilters, TClipGuidancePresets, TGeneratingModel, TImageFormat, TSamplerTypes } from '@/src/widgets/filters-sd/lib/types'

export type Styles =
	| 'Без стилей'
	| '3d-model'
	| 'analog-film'
	| 'anime'
	| 'cinematic'
	| 'comic-book'
	| 'digital-art'
	| 'enhance'
	| 'fantasy-art'
	| 'isometric'
	| 'line-art'
	| 'low-poly'
	| 'modeling-compound'
	| 'neon-punk'
	| 'origami'
	| 'photographic'
	| 'pixel-art'
	| 'tile-texture'

export const styles: Record<string, Styles> = {
	'3D-модель': '3d-model',
	'Фильм аналог': 'analog-film',
	Аниме: 'anime',
	cinematic: 'cinematic',

	'comic-book': 'comic-book',
	'digital-art': 'digital-art',
	enhance: 'enhance',
	'Фентези арт': 'fantasy-art',
	isometric: 'isometric',
	'line-art': 'line-art',
	'low-poly': 'low-poly',
	'modeling-compound': 'modeling-compound',
	'neon-punk': 'neon-punk',
	origami: 'origami',
	photographic: 'photographic',
	'pixel-art': 'pixel-art',
	'tile-texture': 'tile-texture',
	'Без стилей': 'Без стилей',
}

export const FiltersSd: React.FC<ISDFilters> = ({
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
	generatingModel,
	changeGeneratingModel,
	isTranslate,
	changeIsTranslate,
	style,
	changeStyle,
}) => {
	return (
		<Stack direction='column' sx={{ width: '100%' }}>
			<SelectUI
				title={'Размер изображения'}
				value={formatImage}
				onChange={(e) => changeFormatImage(e.target.value as TImageFormat)}
				list={formatImages}
			/>

			<Box sx={{ marginTop: 1 }}>
				<SelectUI title={'Стиль'} value={style} onChange={(e) => changeStyle(e.target.value as Styles)} list={Object.values(styles)} />
			</Box>

			<Slider
				title={'Количество изображений'}
				value={numberImages}
				onChange={(e, cur) => changeNumberImage(e, cur)}
				max={10}
				min={1}
				step={1}
			/>
			<Box sx={{ marginTop: 1 }}>
				<SelectUI
					title={'clip_guidance_preset'}
					value={clipGuidancePreset}
					onChange={(e) => changeClipGuidancePreset(e.target.value as TClipGuidancePresets)}
					list={clipGuidancePresets}
				/>
			</Box>

			<Box sx={{ marginTop: 1 }}>
				<SelectUI
					title={'Генеративная модель'}
					value={generatingModel}
					onChange={(e) => changeGeneratingModel(e.target.value as TGeneratingModel)}
					list={Object.values(GeneratingModel).filter((v) => isNaN(Number(v)))}
				/>
			</Box>

			<Box sx={{ marginTop: 1 }}>
				<SelectUI
					title={'sampler'}
					value={sampleType}
					onChange={(e) => changeSampleType(e.target.value as TSamplerTypes)}
					list={samplerTypes}
				/>
			</Box>

			<Slider
				title={'Шаги для обработки'}
				value={typeof stepsImage === 'number' ? stepsImage : 30}
				onChange={(e, cur) => changeStepsImage(e, cur)}
				max={150}
				min={10}
				step={1}
			/>

			<Slider
				title={'CFG scale'}
				value={typeof cfgScale === 'number' ? cfgScale : 7}
				onChange={(e, cur) => changeCfgScale(e, cur)}
				max={20}
				min={1}
				step={1}
			/>

			<Box sx={{ padding: '0px 5px' }} display='flex' alignItems='center' justifyContent='space-between'>
				<Typography
					sx={{
						fontSize: '14px',
					}}
				>
					Переводить запрос
				</Typography>
				<SwitchCustom checked={isTranslate} onChange={changeIsTranslate} />
			</Box>

			<Typography
				variant='body2'
				onClick={resetSettings}
				sx={{
					color: '#FF4170',
					lineHeight: '19.6px',
					fontSize: '14px',
					fontWeight: '400px',
					marginTop: 1,
					'&:hover': {
						cursor: 'pointer',
					},
				}}
			>
				Сбросить настройки
			</Typography>
		</Stack>
	)
}
