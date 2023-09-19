import React, { useEffect, useRef } from 'react'
import { Box, Button, Step, StepLabel, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import StepperMui from '@mui/material/Stepper'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useAppDispatch, useAppSelector } from '@/src/main/store/store'
import { Error } from '@/src/shared'
import { useShowData } from '@/src/shared/lib/hooks'

import { steps } from '../../lib/constants'
import { switchPreviousStep, switchStep } from '../../model/stepper-slice'
import { StepContact } from '../step-contact/step-contact'
import { StepInformation } from '../step-information/step-information'
import { StepLegalInformative } from '../step-legal-informative/step-legal-informative'

import styles from './stepper.module.scss'
export const Stepper = () => {
	const activeStep = useAppSelector((state) => state.stepper.activeStep)

	const loadingCreate = useAppSelector((state) => state.stepper.loadingCreate)

	const dispatch = useAppDispatch()

	const { error, showError } = useShowData()

	const processCreate = useAppSelector((state) => state.stepper.loadingCreate)

	const { push } = useRouter()

	useEffect(() => {
		if (processCreate === 'failed') {
			showError('Ошибка создания аккаунта')
		}

		if (processCreate === 'succeeded') {
			push('/business')
		}
	}, [processCreate])

	const isShowBackBtn = activeStep !== 0

	const refForm: React.LegacyRef<HTMLButtonElement> = useRef(null)
	const changeStep = (idx: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (idx === activeStep) {
			e.preventDefault()
			return
		}

		if (idx < activeStep) {
			e.preventDefault()
			dispatch(switchStep(idx))
			return
		}

		refForm.current!.form!.submit()
	}

	return (
		<Box className={styles.wrapper}>
			<>
				{loadingCreate === 'pending' ? (
					<CircularProgress
						size={25}
						thickness={5}
						sx={{
							color: '#7F7DF3',
						}}
					/>
				) : (
					<Box className={styles.wrapperStepper}>
						{isShowBackBtn && (
							<Image
								onClick={() => dispatch(switchPreviousStep())}
								className={styles.back}
								src={'/svg/business/back-register.svg'}
								width={31}
								height={26}
								alt={'Назад'}
							/>
						)}
						<Typography className={styles.title}>Регистрация корпоративного аккаунта</Typography>
						<StepperMui activeStep={activeStep} className={styles.stepper} alternativeLabel>
							{steps.map((label, idx) => (
								<Step key={label}>
									<button
										id='submitBtn'
										style={{
											zIndex: 100,
											width: '100%',
											position: 'absolute',
											height: '100%',
											opacity: 0,
											cursor: 'pointer',
										}}
										ref={refForm}
										onClick={(e) => changeStep(idx, e)}
										type={'submit'}
										form={`step${activeStep + 1}`}
									/>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</StepperMui>
						<Box className={styles.model}>
							{activeStep === 0 ? <StepInformation /> : activeStep === 1 ? <StepLegalInformative /> : <StepContact />}
						</Box>
						<Error error={error} open={Boolean(error)} />
					</Box>
				)}
			</>
		</Box>
	)
}
