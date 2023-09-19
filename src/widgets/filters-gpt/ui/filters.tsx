import React, { memo, useMemo, useState } from 'react'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import { Box, Button, MenuItem, Slider, Tooltip, Typography } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

import { useAppSelector } from '@/src/main/store/store'
import { TutorialContext } from '@/src/pages/chatgpt'
import { Select } from '@/src/shared'
import { SwitchCustom } from '@/src/shared'
import { ITypeModels, ParameterPresencePenalty, ParameterTemperature, ParameterTopP } from '@/src/widgets/filters-gpt/lib/constants'
import FiltersMobile from '@/src/widgets/filters-gpt/ui/filters-mobile'
import TooltipModelTypes from '@/src/widgets/filters-gpt/ui/tooltip-model-types'

import 'intro.js/introjs.css'

interface IFiltersChatGPTMobile {
	open?: boolean
	handleOpenFilters?: () => void
	handleCloseFilters?: () => void
}

export interface IFiltersChatGPT extends IFiltersChatGPTMobile {
	device: 'mobile' | 'desktop'
	typeModel: string
	typeModels: ITypeModels[]
	temperatureModel: number | number[]
	parameterTopP: number | number[]
	parameterPresence: number | number[]
	isAdditional?: boolean
	handleChangeTypeModel: (e: SelectChangeEvent) => void
	changeTemperature: (e: Event, current: number | number[]) => void
	changeTopP: (e: Event, current: number | number[]) => void
	changePresence: (e: Event, current: number | number[]) => void
	resetSettings: () => void
	changeAdditionalCtx?: () => void
}

export const PrettoSlider = styled(Slider)({
	width: '90%',
	color: '#E1E1E1',
	height: 7,
	'& .MuiSlider-track': {
		border: 'none',
	},
	'& .MuiSlider-thumb': {
		height: 22,
		width: 22,
		backgroundColor: '#fff',
		border: '2px solid #7F7DF3',
		'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
			boxShadow: 'inherit',
		},
		'&:before': {
			display: 'none',
		},
	},
})
export const PrettoSliderDark = styled(Slider)({
	width: '90%',
	color: '#E1E1E1',
	height: 7,
	'& .MuiSlider-track': {
		border: 'none',
		backgroundColor: '#4B4B4B',
	},
	'.MuiSlider-rail': {
		border: 'none',
		backgroundColor: '#4B4B4B',
	},
	'& .MuiSlider-thumb': {
		height: 22,
		width: 22,
		backgroundColor: '#373737',
		border: '2px solid #7F7DF3',
		'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
			boxShadow: 'inherit',
		},
		'&:before': {
			display: 'none',
		},
	},
})

export const Filters: React.FC<IFiltersChatGPT> = memo(
	({
		device,
		parameterPresence,
		parameterTopP,
		temperatureModel,
		typeModels,
		typeModel,
		handleChangeTypeModel,
		changeTemperature,
		changeTopP,
		changePresence,
		resetSettings,
		handleCloseFilters,
		open,
		isAdditional,
		changeAdditionalCtx,
	}) => {
		const desktop = device === 'desktop'

		const theme = useAppSelector((state) => state.theme.theme)

		const [showConfigure, setShowConfigure] = React.useState(false)

		const contextTutorial = React.useContext(TutorialContext)

		typeModels.find((el) => el.key === typeModel)!.value

		const isAdditionalCtx = useMemo(() => {
			const value = typeModels.find((el) => el.key === typeModel)!.value

			return value === 'gpt-3.5-turbo' || value === 'gpt-4' ? true : false
		}, [typeModel])

		React.useEffect(() => {
			if (contextTutorial?.step === 3) {
				setTimeout(() => setShowConfigure(true), 500)
				return
			}

			setShowConfigure(false)
		}, [contextTutorial?.step])
		return (
			<>
				{desktop ? (
					<Stack className='tutorial-show-setting' direction='column' sx={{ width: '20%', marginLeft: 6, marginTop: 1.5 }} spacing={2}>
						<Typography
							variant='body2'
							sx={{
								marginTop: 1,
								color: '#868686',
								lineHeight: '19.6px',
								fontSize: '15px',
								fontWeight: '600px',
							}}
						>
							Тип модели
						</Typography>
						<Box width='90%'>
							<Select value={typeModel} onChange={handleChangeTypeModel}>
								{typeModels.map((model) => {
									return (
										<MenuItem key={model.value} value={model.key}>
											<TooltipModelTypes
												title={model.key}
												description={model.description}
												warning={model.warning}
												advantages={model.advantages || ''}
											>
												<Typography
													sx={{
														fontSize: '18px',
													}}
												>
													{model.key}
												</Typography>
											</TooltipModelTypes>
										</MenuItem>
									)
								})}
							</Select>
						</Box>
						{isAdditionalCtx && (
							<Box width='89%' display='flex' alignItems='center' justifyContent='space-between'>
								<Typography
									sx={{
										color: '#868686',
										lineHeight: '19.6px',
										fontSize: '14px',
										fontWeight: '600px',
									}}
								>
									Увеличенный контекст
								</Typography>
								<SwitchCustom checked={isAdditional} onChange={() => changeAdditionalCtx!()} />
							</Box>
						)}
						<Tooltip
							placement='left'
							componentsProps={{
								tooltip: {
									sx: {
										'&.MuiTooltip-tooltip': {
											'&.MuiTooltip-tooltipPlacementLeft': {
												marginRight: '15px',
											},
										},
										bgcolor: theme === 'light' ? 'white' : '#4B4B4B',
										borderRadius: '10px',
										'& .MuiTooltip-arrow': {
											color: theme === 'light' ? 'white' : 'red',
										},
										boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 32px rgba(0, 0, 0, 0.16)',
									},
								},
							}}
							title={
								<Typography
									sx={{
										p: 1,
										fontSize: '15px',
										color: '#868686',
									}}
								>
									{ParameterTemperature}
								</Typography>
							}
						>
							<Stack direction='row' justifyContent='space-between' alignItems='center'>
								<Typography
									variant='body2'
									display='inline'
									sx={{
										color: '#868686',
										lineHeight: '19.6px',
										fontSize: '14px',
										fontWeight: '600px',
									}}
								>
									Температура
								</Typography>
								<Typography
									variant='body2'
									display='inline'
									sx={{
										color: '#7F7DF3',
										fontWeight: '400px',
										marginRight: 6,
									}}
								>
									{temperatureModel}
								</Typography>
							</Stack>
						</Tooltip>

						{theme === 'light' ? (
							<PrettoSlider
								value={temperatureModel}
								onChange={(e, current) => changeTemperature(e, current)}
								max={1}
								min={0}
								step={0.1}
								aria-label='pretto slider'
							/>
						) : (
							<PrettoSliderDark
								value={temperatureModel}
								onChange={(e, current) => changeTemperature(e, current)}
								max={1}
								min={0}
								step={0.1}
								aria-label='pretto slider'
							/>
						)}

						<Button
							startIcon={<SettingsSuggestIcon />}
							style={{ marginTop: '30px' }}
							variant='contained'
							sx={{
								width: '90%',
								backgroundColor: '#7F7DF3',
								fontSize: '14px',
								':hover': { backgroundColor: '#7F7DF3' },
							}}
							onClick={() => setShowConfigure((prevState) => !prevState)}
						>
							Настройки
						</Button>
						{showConfigure && (
							<>
								<Tooltip
									placement='left'
									componentsProps={{
										tooltip: {
											sx: {
												'&.MuiTooltip-tooltip': {
													'&.MuiTooltip-tooltipPlacementLeft': {
														marginRight: '15px',
													},
												},
												bgcolor: theme === 'light' ? 'white' : '#4B4B4B',
												borderRadius: '10px',
												'& .MuiTooltip-arrow': {
													color: theme === 'light' ? 'white' : 'red',
												},
												boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 32px rgba(0, 0, 0, 0.16)',
											},
										},
									}}
									title={
										<Typography
											sx={{
												p: 1,
												fontSize: '15px',
												color: '#868686',
											}}
										>
											{ParameterTopP}
										</Typography>
									}
								>
									<Stack direction='row' justifyContent='space-between' alignItems='center'>
										<Typography
											variant='body2'
											display='inline'
											sx={{
												color: '#868686',
												lineHeight: '19.6px',
												fontSize: '14px',
												fontWeight: '600px',
											}}
										>
											Top_p
										</Typography>
										<Typography
											variant='body2'
											display='inline'
											sx={{
												color: '#7F7DF3',
												fontWeight: '400px',
												marginRight: 6,
											}}
										>
											{parameterTopP}
										</Typography>
									</Stack>
								</Tooltip>
								{theme === 'light' ? (
									<PrettoSlider
										value={parameterTopP}
										onChange={(e, current) => changeTopP(e, current)}
										max={1}
										min={0}
										step={0.1}
										aria-label='pretto slider'
									/>
								) : (
									<PrettoSliderDark
										value={parameterTopP}
										onChange={(e, current) => changeTopP(e, current)}
										max={1}
										min={0}
										step={0.1}
										aria-label='pretto slider'
									/>
								)}
								<Tooltip
									placement='left'
									componentsProps={{
										tooltip: {
											sx: {
												'&.MuiTooltip-tooltip': {
													'&.MuiTooltip-tooltipPlacementLeft': {
														marginRight: '15px',
													},
												},
												bgcolor: theme === 'light' ? 'white' : '#4B4B4B',
												borderRadius: '10px',
												'& .MuiTooltip-arrow': {
													color: theme === 'light' ? 'white' : 'red',
												},
												boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 32px rgba(0, 0, 0, 0.16)',
											},
										},
									}}
									title={
										<Typography
											sx={{
												p: 1,
												fontSize: '15px',
												color: '#868686',
											}}
										>
											{ParameterPresencePenalty}
										</Typography>
									}
								>
									<Stack direction='row' justifyContent='space-between' alignItems='center'>
										<Typography
											variant='body2'
											display='inline'
											sx={{
												color: '#868686',
												lineHeight: '19.6px',
												fontSize: '14px',
												fontWeight: '600px',
											}}
										>
											Штраф за присутствие
										</Typography>
										<Typography
											variant='body2'
											display='inline'
											sx={{
												color: '#7F7DF3',
												fontWeight: '400px',
												marginRight: 6,
											}}
										>
											{parameterPresence}
										</Typography>
									</Stack>
								</Tooltip>

								{theme === 'light' ? (
									<PrettoSlider
										value={parameterPresence}
										onChange={(e, current) => changePresence(e, current)}
										max={2}
										min={-2}
										step={0.1}
										aria-label='pretto slider'
									/>
								) : (
									<PrettoSliderDark
										value={parameterPresence}
										onChange={(e, current) => changePresence(e, current)}
										max={2}
										min={-2}
										step={0.1}
										aria-label='pretto slider'
									/>
								)}
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
								marginTop: 1,
								'&:hover': {
									cursor: 'pointer',
								},
							}}
						>
							Сбросить настройки
						</Typography>
					</Stack>
				) : (
					<FiltersMobile
						changeAdditionalCtx={changeAdditionalCtx}
						device={device}
						changeTemperature={changeTemperature}
						changeTopP={changeTopP}
						handleChangeTypeModel={handleChangeTypeModel}
						parameterPresence={parameterPresence}
						temperatureModel={temperatureModel}
						changePresence={changePresence}
						parameterTopP={parameterTopP}
						typeModel={typeModel}
						resetSettings={resetSettings}
						typeModels={typeModels}
						open={open}
						handleCloseFilters={handleCloseFilters}
					/>
				)}
			</>
		)
	}
)

Filters.displayName = 'Filters'
