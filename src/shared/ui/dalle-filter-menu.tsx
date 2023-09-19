import * as React from 'react'
import { Slider, Stack, Typography } from '@mui/material'
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { useAppSelector } from '@/src/main/store/store'

interface IDalleFilterMenu {
	anchorEl: null | HTMLElement
	open: boolean
	closeMenu: Function
	format: string
	changeFormat: Function
	numberImages: number | number[] | undefined
	sliderChange: Function
}

export const DalleFilterMenu: React.FC<IDalleFilterMenu> = ({ anchorEl, closeMenu, format, changeFormat, numberImages, sliderChange, open }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	return (
		<Menu
			id='dalle-filter-menu'
			anchorEl={anchorEl}
			open={open}
			onClose={() => closeMenu()}
			MenuListProps={{ 'aria-labelledby': 'dalle-filter-button' }}
			PaperProps={{
				sx: {
					backgroundColor: theme === 'light' ? '' : '#3D3D3D',
				},
			}}
		>
			<MenuItem>
				<Typography
					variant='body2'
					sx={{
						color: '#868686',
						lineHeight: '18.2px',
						fontSize: '15px',
						fontWeight: '600px',
						marginLeft: 1,
					}}
				>
					Формат
				</Typography>
			</MenuItem>
			<MenuItem>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={format === '256x256'}
								onChange={() => changeFormat('256x256')}
								inputProps={{
									'aria-label': 'controlled',
								}}
								sx={{
									[`&, &.${checkboxClasses.checked}`]: {
										color: '#7F7DF3',
									},
									[`&, &.${!checkboxClasses.checked}`]: {
										color: '#7F7DF3',
									},
									marginLeft: 2.5,
									marginRight: 1,
									width: '1em',
									height: '1em',
								}}
							/>
						}
						label={
							<Typography
								variant='body2'
								sx={{
									color: '#868686',
									fontSize: '14px',
									fontWeight: 400,
								}}
							>
								256x256
							</Typography>
						}
					/>
				</FormGroup>
			</MenuItem>
			<MenuItem>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={format === '512x512'}
								onChange={() => changeFormat('512x512')}
								inputProps={{
									'aria-label': 'controlled',
								}}
								sx={{
									[`&, &.${checkboxClasses.checked}`]: {
										color: '#7F7DF3',
									},
									[`&, &.${!checkboxClasses.checked}`]: {
										color: '#7F7DF3',
									},
									marginLeft: 2.5,
									marginRight: 1,
									width: '1em',
									height: '1em',
								}}
							/>
						}
						label={
							<Typography
								variant='body2'
								sx={{
									color: '#868686',
									fontSize: '14px',
									fontWeight: 400,
								}}
							>
								512x512
							</Typography>
						}
					/>
				</FormGroup>
			</MenuItem>
			<MenuItem>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={format === '1024x1024'}
								onChange={() => changeFormat('1024x1024')}
								inputProps={{
									'aria-label': 'controlled',
								}}
								sx={{
									[`&, &.${checkboxClasses.checked}`]: {
										color: '#7F7DF3',
									},
									[`&, &.${!checkboxClasses.checked}`]: {
										color: '#7F7DF3',
									},
									marginLeft: 2.5,
									marginRight: 1,
									width: '1em',
									height: '1em',
								}}
							/>
						}
						label={
							<Typography
								variant='body2'
								sx={{
									color: '#868686',
									fontSize: '14px',
									fontWeight: 400,
								}}
							>
								1024x1024
							</Typography>
						}
					/>
				</FormGroup>
			</MenuItem>
			<MenuItem>
				<Stack direction='row' alignItems='center'>
					<Typography
						variant='body2'
						sx={{
							color: '#868686',
							lineHeight: '18.2px',
							fontSize: '15px',
							fontWeight: '600px',
							marginLeft: 1,
						}}
					>
						Изображений
					</Typography>
					<Typography
						variant='body2'
						sx={{
							color: '#7F7DF3',
							lineHeight: '18.2px',
							fontSize: '15px',
							fontWeight: '600px',
							marginLeft: 3,
						}}
					>
						{numberImages}
					</Typography>
				</Stack>
			</MenuItem>
			<MenuItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
				<Typography
					variant='body2'
					sx={{
						color: '#868686',
						lineHeight: '18.2px',
						fontSize: '13px',
						fontWeight: '400px',
						marginLeft: 1,
					}}
				>
					За одну генерацию
				</Typography>
			</MenuItem>
			<MenuItem sx={{ paddingTop: 0 }}>
				<Slider
					value={typeof numberImages === 'number' ? numberImages : 1}
					onChange={(e, current) => sliderChange(e, current)}
					max={10}
					min={1}
					step={1}
					marks
					sx={{
						width: '15vh',
						color: '#7F7DF3',
						marginLeft: 1,
						marginRight: 1,
					}}
				/>
			</MenuItem>
		</Menu>
	)
}
