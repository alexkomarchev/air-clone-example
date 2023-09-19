import React, { useState } from 'react'
import { Box, Button, MenuItem, Stack, Typography } from '@mui/material'
import Router from 'next/router'
import { useSession } from 'next-auth/react'

import { useAppSelector } from '@/src/main/store/store'
import { Balance, CheckBoxAgreeWithRules } from '@/src/shared'
import { Select } from '@/src/shared'
import { accountApi } from '@/src/shared/api/account-endpoints'
import Offer from '@/src/widgets/payment/ui/offer'

export interface IOffer {
	uid: string
	price: string
	tokens_per_plan: string
}

interface IPaymentsProps {
	device: 'mobile' | 'desktop'
	offers: IOffer[] | null
}

export const Payment: React.FC<IPaymentsProps> = ({ offers, device }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	const desktop = device === 'desktop'

	const [selectedOffer, setSelectedOffer] = useState(offers?.length ? offers[0].uid : '')

	const [isAgree, setIsAgree] = React.useState(false)

	const [isAgreeError, setIsAgreeError] = React.useState(false)

	const { data } = useSession()

	const balance = useAppSelector((state) => state.balance.balance)
	const getSelectedOfferByUid = (uid: string | null): string | number => {
		if (!uid) {
			return 0
		}
		return offers?.filter((offer) => offer.uid === uid)[0].price || 0
	}

	const pay = async () => {
		if (!isAgree) {
			setIsAgreeError(true)
			setTimeout(() => setIsAgreeError(false), 4000)
			return
		}

		const urlForPay = await accountApi.payProduct(data!.access, selectedOffer)

		urlForPay ? await Router.push(urlForPay) : null
	}

	return (
		<Stack
			sx={{
				backgroundColor: theme === 'light' ? 'transparent' : '#4B4B4B',
				borderRadius: '16px',
				padding: 3.5,
				width: '100%',
			}}
			spacing={2}
		>
			<Box display='flex' sx={{ color: theme === 'light' ? '#5A5A5A' : '#E1E1E1' }} justifyContent='space-between' alignItems='center'>
				<Typography sx={{ fontWeight: '500' }}>Покупка токенов</Typography>
				<Box
					display='flex'
					alignItems='center'
					sx={{
						fontSize: '15px',
						marginRight: desktop ? 2 : 0,
						marginTop: 0.5,
					}}
				>
					<Typography>Баланс:</Typography>
					<Box sx={{ marginLeft: 0.5 }}>
						<Balance sx={{ marginLeft: 0.5 }} balance={balance} />
					</Box>
				</Box>
			</Box>
			{desktop && <Typography sx={{ fontSize: '16px', color: '#A6A5A5' }}>Выберите тариф</Typography>}

			{desktop ? (
				<Box display='flex' sx={{ width: '100%' }}>
					{offers?.map((offer) => {
						return (
							<Offer
								device={device}
								selectedOffer={selectedOffer}
								pickOffer={(uid) => setSelectedOffer(uid)}
								uid={offer.uid}
								price={offer.price}
								tokens_per_plan={offer.tokens_per_plan}
								key={offer.uid}
							/>
						)
					})}
				</Box>
			) : (
				<Select value={selectedOffer} onChange={(e) => setSelectedOffer(e.target.value)}>
					{offers?.map((offer) => {
						return (
							<MenuItem value={offer.uid} key={offer.uid}>
								{Math.floor(+offer.tokens_per_plan)} токенов за {Math.floor(+offer.price)} ₽
							</MenuItem>
						)
					})}
				</Select>
			)}

			{selectedOffer && (
				<Box>
					<CheckBoxAgreeWithRules isAgreeError={isAgreeError} changeAgree={() => setIsAgree((prev) => !prev)} isAgree={isAgree} />
					<Box display='flex' alignItems='center' sx={{ marginTop: 2 }}>
						<Button
							onClick={pay}
							sx={{
								backgroundColor: '#7F7DF3',
								color: 'white',
								width: desktop ? '96px' : '40%',
								borderRadius: '15px',
								fontSize: '15px',
								padding: '10px',
								'&:hover': {
									backgroundColor: '#7F7DF3',
								},
							}}
						>
							Купить
						</Button>
						<Typography
							sx={{
								color: '#7F7DF3',
								marginLeft: 2.5,
								fontSize: desktop ? '22px' : '22px',
							}}
						>
							{Math.floor(+getSelectedOfferByUid(selectedOffer))} ₽
						</Typography>
					</Box>
				</Box>
			)}
		</Stack>
	)
}
