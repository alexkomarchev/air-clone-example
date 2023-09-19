import React from 'react'
import { Drawer, MenuItem, Slider, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'

import { useAppSelector } from '@/src/main/store/store'
import { Select } from '@/src/shared'
import { IFiltersChatGPT } from '@/src/widgets/filters-gpt/ui/filters'
import TooltipModelTypes from '@/src/widgets/filters-gpt/ui/tooltip-model-types'

const FiltersMobile: React.FC<IFiltersChatGPT> = ({
	open,
	handleCloseFilters,
	parameterTopP,
	temperatureModel,
	typeModels,
	typeModel,
	handleChangeTypeModel,
	changeTemperature,
	changeTopP,
	changePresence,
	parameterPresence,
	resetSettings,
}) => {
	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Drawer
			sx={{
				'.MuiStack-root': {
					backgroundColor: theme === 'light' ? 'white' : '#4B4B4B',
					border: 'none',
				},
				'.MuiPaper-root': {
					backgroundColor: theme === 'light' ? 'white' : '#4B4B4B',
					border: 'none',
				},
			}}
			PaperProps={{
				style: { borderRadius: '15px 15px 0px 0px' },
			}}
			open={Boolean(open)}
			onClose={handleCloseFilters}
			anchor='bottom'
		>
			<Stack
				direction='column'
				sx={{
					width: '100%',
					backgroundColor: 'white',
					border: 'none',
					padding: 2,
				}}
				spacing={1.2}
			>
				<Typography
					variant='body2'
					sx={{
						color: '#868686',
						lineHeight: '19.6px',
						fontSize: '14px',
						fontWeight: '600px',
					}}
				>
					Тип модели
				</Typography>

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
									<Typography sx={{ fontSize: '18px' }}>{model.key}</Typography>
								</TooltipModelTypes>
							</MenuItem>
						)
					})}
				</Select>

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
							marginRight: 0,
						}}
					>
						{temperatureModel}
					</Typography>
				</Stack>
				<Slider
					aria-label='Always visible'
					value={temperatureModel}
					onChange={(e, current) => changeTemperature(e, current)}
					max={1}
					min={0}
					step={0.1}
					sx={{
						width: '100%',
						color: '#7F7DF3',
						marginLeft: 1,
						marginRight: 1,
					}}
				/>

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
						Параметр top_p
					</Typography>
					<Typography
						variant='body2'
						display='inline'
						sx={{
							color: '#7F7DF3',
							fontWeight: '400px',
							marginRight: 0,
						}}
					>
						{parameterTopP}
					</Typography>
				</Stack>
				<Slider
					aria-label='Always visible'
					value={parameterTopP}
					onChange={(e, current) => changeTopP(e, current)}
					max={1}
					min={0}
					step={0.1}
					sx={{
						width: '100%',
						color: '#7F7DF3',
						marginLeft: 1,
						marginRight: 1,
					}}
				/>

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
						Параметр presence_penalty
					</Typography>
					<Typography
						variant='body2'
						display='inline'
						sx={{
							color: '#7F7DF3',
							fontWeight: '400px',
							marginRight: 1,
						}}
					>
						{parameterPresence}
					</Typography>
				</Stack>
				<Slider
					aria-label='Always visible'
					value={parameterPresence}
					onChange={(e, current) => changePresence(e, current)}
					max={2}
					min={-2}
					step={0.1}
					sx={{
						width: '100%',
						color: '#7F7DF3',
						marginLeft: 1,
						marginRight: 1,
					}}
				/>

				<Typography
					variant='body2'
					onClick={resetSettings}
					sx={{
						color: '#FF4170',
						lineHeight: '19.6px',
						fontSize: '14px',
						fontWeight: '400px',
						marginTop: 0.5,
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

export default FiltersMobile
