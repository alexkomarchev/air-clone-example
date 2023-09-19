import React, { useEffect } from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Box, Button, MobileStepper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { change } from '@/src/entities/theme'
import { TranslateFields } from '@/src/features/get-admin-stats/lib/constants'
import { useAppDispatch } from '@/src/main/store/store'
import { TypographyDark, TypographyLight } from '@/src/shared/lib/constants/styles'

import { IStatsProps } from '../model/types'
import { useGetStats } from '../model/use-get-stats/use-get-stats'

export const Stats: React.FC<IStatsProps> = ({ token, device, product, group_by, start_date, end_date, theme }) => {
	const [stats, loading] = useGetStats(token, start_date, end_date, group_by, product)

	const [activeStep, setActiveStep] = React.useState(0)

	const light = theme === 'light'

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(change('light'))
	}, [])

	return (
		<Box>
			<Box sx={{ width: 'fit-content', minWidth: '400px', minHeight: '500px', flexGrow: 1, padding: 0 }}>
				{stats.length !== 0 && loading === false && (
					<MobileStepper
						steps={stats.length}
						activeStep={activeStep}
						variant='text'
						position='static'
						nextButton={
							<Button size='small' onClick={() => setActiveStep((prev) => prev + 1)} disabled={activeStep === stats.length - 1}>
								Следующая дата
								<KeyboardArrowRight />
							</Button>
						}
						backButton={
							<Button size='small' onClick={() => setActiveStep((prev) => prev - 1)} disabled={activeStep === 0}>
								<KeyboardArrowLeft />
								Предыдущая дата
							</Button>
						}
					/>
				)}
				<Box sx={{ marginLeft: 4 }}>
					{loading ? (
						<CircularProgress size={25} thickness={5} sx={{ color: '#7F7DF3', marginLeft: 3 }} />
					) : (
						<>
							{stats !== undefined && Object.keys(stats).length === 0 ? (
								<Typography sx={light ? { ...TypographyLight } : { ...TypographyDark }}>Данные отсутствуют</Typography>
							) : (
								<Table size='small' sx={{ minWidth: 650 }} aria-label='simple table'>
									<TableBody>
										{Object.entries(stats[activeStep]).map(([key, value]) => {
											return (
												<>
													<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
														<TableCell align='left'>
															{TranslateFields[key as keyof typeof TranslateFields]}
														</TableCell>
														<TableCell align='left'>{value}</TableCell>
													</TableRow>
												</>
											)
										})}
									</TableBody>
								</Table>
							)}
						</>
					)}
				</Box>
			</Box>
		</Box>
	)
}
