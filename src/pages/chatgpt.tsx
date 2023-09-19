import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { getSession } from 'next-auth/react'

import { Layout } from '@/src/main/layout'
import { Error } from '@/src/shared'
import { api } from '@/src/shared/api/endpoints'
import { getAccessToken } from '@/src/shared/lib/helpers'
import { getTypeDevice } from '@/src/shared/lib/helpers'
import { IChatGPTProps, ImessageContext, IMessageResponse } from '@/src/shared/lib/types/types-gpt'
import { Chat } from '@/src/widgets/chat-gpt-field'
import { Filters } from '@/src/widgets/filters-gpt'
import { typeModels } from '@/src/widgets/filters-gpt/lib/constants'
import { ModelTopBar } from '@/src/widgets/top-bar-model'

import 'intro.js/introjs.css'

interface TutorialContext {
	step: number
	setStep: (step: number) => void
}

export async function getServerSideProps(context: any): Promise<{ props: IChatGPTProps }> {
	const token = (await getAccessToken(context.req)) || null

	const device = getTypeDevice(context)

	const { req } = context

	const session = await getSession({ req })

	const messages = await api.getMessagesChatGPT(token)

	const favorites = await api.getFavoritesModel(token, session)

	return {
		props: {
			device,
			messages,
			token,
			favorites,
		},
	}
}

export const TutorialContext = React.createContext<TutorialContext | null>(null)

const ChatGPT: React.FC<IChatGPTProps> = ({ device, messages, token, favorites }) => {
	const [context, setContext] = React.useState<ImessageContext[]>([])

	const [temperatureModel, setTemperatureModel] = React.useState<number | number[]>(0.5)

	const [parameterTopP, setParameterTopP] = React.useState<number | number[]>(0.5)

	const [parameterPresence, setParameterPresence] = React.useState<number | number[]>(0)

	const [typeModel, setTypeModel] = React.useState<string>(typeModels[1].key)

	const [isAdditionalCtx, setIsAdditionalCtx] = useState(false)

	const [error, setError] = React.useState('')

	React.useEffect(() => {
		if (!typeModel.includes('GPT')) {
			setContext([])
		}
	}, [typeModel])

	const desktop = device === 'desktop'

	const handleChangeTypeModel = (event: SelectChangeEvent) => {
		setTypeModel(event.target.value as string)
	}
	const changeTemperature = (event: Event, newValue: number | number[]) => {
		setTemperatureModel(newValue)
	}

	const changeTopP = (event: Event, newValue: number | number[]) => {
		setParameterTopP(newValue)
	}

	const changePresence = (event: Event, newValue: number | number[]) => {
		setParameterPresence(newValue)
	}
	const resetSettings = () => {
		setTypeModel('GPT-3.5')
		setTemperatureModel(0.5)
		setParameterTopP(0.5)
		setParameterPresence(0)
		setIsAdditionalCtx(false)
	}

	const showErrorSendMessage = (text: string) => {
		setError(text)
		setTimeout(() => setError(''), 3000)
	}

	const deleteContextMessage = (start_time: string) => {
		setContext((prevState) => prevState.filter((mess) => mess.start_time !== start_time))
	}

	const addToContext = React.useCallback(
		({ question, start_time }: IMessageResponse) => {
			const messageContext = { question, start_time }

			if (context?.filter((el) => el.start_time === start_time).length === 0) {
				setContext((prevState) => [...prevState, messageContext])
			}
		},
		[context]
	)

	const [step, setStep] = React.useState(0)

	useEffect(() => {
		if (typeModel === 'GPT-3.5' || typeModel === 'GPT-4') {
			return
		}

		setIsAdditionalCtx(false)
	}, [typeModel])

	return (
		<Layout titlePage={'ChatGPT'} device={device} title={'ChatGPT'}>
			<TutorialContext.Provider value={{ step, setStep }}>
				{!desktop && <ModelTopBar title={'ChatGPT'} favorites={favorites} device={device} token={token} />}
				<Stack direction={desktop ? 'row' : 'column'} justifyContent={'center'} sx={{ width: '100%', marginTop: 0 }}>
					<Chat
						changeTemperature={changeTemperature}
						changeTopP={changeTopP}
						handleChangeTypeModel={handleChangeTypeModel}
						resetSettings={resetSettings}
						changePresence={changePresence}
						removeAllContext={() => setContext([])}
						messages={messages}
						token={token}
						context={context}
						addToContext={addToContext}
						deleteContextMessage={deleteContextMessage}
						typeModels={typeModels}
						device={device}
						parameterPresence={parameterPresence}
						temperatureModel={temperatureModel}
						parameterTopP={parameterTopP}
						typeModel={typeModel}
						showErrorUnauthenticated={(value) => setError(value)}
						showError={showErrorSendMessage}
						isAdditional={isAdditionalCtx}
					/>

					<Filters
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
						isAdditional={isAdditionalCtx}
						changeAdditionalCtx={() => setIsAdditionalCtx((prev) => !prev)}
					/>
					<Error error={error} open={Boolean(error)} />
				</Stack>
			</TutorialContext.Provider>
		</Layout>
	)
}

export default ChatGPT
