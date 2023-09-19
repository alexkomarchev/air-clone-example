import React from 'react'
import { Box, Typography } from '@mui/material'

import { Balance } from '@/src/shared'
import { useThemeAndDevice } from '@/src/shared/lib/hooks'
import { IOffer } from '@/src/widgets/payment/model/payment'

interface IOfferProps extends IOffer {
	pickOffer: (uid: string) => void
	selectedOffer: string
	device: 'desktop' | 'mobile'
}

const Offer: React.FC<IOfferProps> = ({ pickOffer, uid, tokens_per_plan, price, selectedOffer, device }) => {
	const { theme, desktop } = useThemeAndDevice(device)

	return (
		<Box
			onClick={() => pickOffer(uid)}
			sx={{
				width: desktop ? '31%' : '31%',
				height: '150px',
				borderRadius: '13px',
				border: selectedOffer === uid ? '1px solid #A2A1E3' : theme === 'light' ? '1px solid #E7E7E7' : '1px solid #2C2C2C',
				backgroundColor: theme === 'light' ? 'white' : '#464646',
				padding: '11px 15px',
				cursor: 'pointer',
				marginRight: desktop ? '15px' : 0,
				marginLeft: desktop ? 0 : 1,
			}}
		>
			<Typography
				sx={{
					fontSize: '16px',
					color: selectedOffer === uid ? '#7F7DF3' : theme === 'light' ? '#606060' : '#E1E1E1',
				}}
			>
				Тариф
			</Typography>
			<Balance
				sx={{
					fontSize: '24px',
					color: selectedOffer === uid ? '#7F7DF3' : theme === 'light' ? '#606060' : '#E1E1E1',
					fontWeight: '600',
					fontStyle: 'normal',
					marginLeft: 0.8,
				}}
				balance={+tokens_per_plan}
			/>
			<Typography
				sx={{
					fontSize: '16px',
					color: '#969696',
					marginTop: 5,
					lineHeight: '18px',
				}}
			>
				{Math.floor(+price)} ₽
			</Typography>
		</Box>
	)
}

export default Offer
