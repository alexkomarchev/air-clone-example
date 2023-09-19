import React from 'react'
import { Steps } from 'intro.js-react'
import Image from 'next/image'

import { TutorialContext } from '@/src/pages/chatgpt'

import { options, steps } from '../lib/constants'

import TooltipMy from './tooltip'

export const Tutorial = () => {
	const [enabled, setEnabled] = React.useState(false)

	const context = React.useContext(TutorialContext)
	const onExit = () => {
		setEnabled(false)
	}

	return (
		<>
			<TooltipMy begin={() => setEnabled(true)}>
				<Image style={{ cursor: 'pointer' }} src={'/svg/tutorial.svg'} alt={''} width={25} height={25} />
			</TooltipMy>

			<Steps
				onChange={(e) => {
					context?.setStep(e)
				}}
				options={options}
				enabled={enabled}
				steps={steps}
				onExit={onExit}
				initialStep={0}
			/>
		</>
	)
}
