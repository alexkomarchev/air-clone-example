import React, { memo, useEffect } from 'react'
import { Box, InputAdornment, Stack, TextField } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { getUserBalance } from '@/src/entities/balance'
import { Calculation } from '@/src/features/calculation-tokens-gpt'
import { responseGPT } from '@/src/features/tutorial-gpt/lib/constants'
import { useAppDispatch, useAppSelector } from '@/src/main/store/store'
import { TutorialContext } from '@/src/pages/chatgpt'
import { api } from '@/src/shared/api/endpoints'
import { decodeError } from '@/src/shared/lib/helpers/decode-error'
import { ImessageContext, IMessageResponse } from '@/src/shared/lib/types/types-gpt'
import { styleInputWithoutBorderFocus } from '@/src/shared/ui/input'
import Context from '@/src/widgets/chat-gpt-field/ui/context'
import MessagesList from '@/src/widgets/chat-gpt-field/ui/messages-list'
import { Filters } from '@/src/widgets/filters-gpt'
import { TypeModelGPT } from '@/src/widgets/filters-gpt/lib/constants'
import { IFiltersChatGPT } from '@/src/widgets/filters-gpt/ui/filters'

import 'intro.js/introjs.css'

interface IChatChatGPT extends IFiltersChatGPT {
	token: string | null
	context: ImessageContext[]
	addToContext: (message: IMessageResponse) => void
	deleteContextMessage: (start_time: string) => void
	removeAllContext: () => void
	messages: IMessageResponse[] | []
	showErrorUnauthenticated: (state: string) => void
	showError: (text: string) => void
}

export const Chat: React.FC<IChatChatGPT> = memo(
	({
		device,
		token,
		context,
		addToContext,
		parameterPresence,
		parameterTopP,
		temperatureModel,
		typeModel,
		typeModels,
		messages,
		deleteContextMessage,
		showErrorUnauthenticated,
		changeTemperature,
		changePresence,
		changeTopP,
		handleChangeTypeModel,
		removeAllContext,
		resetSettings,
		showError,
		isAdditional,
	}) => {
		const desktop = device === 'desktop'

		const [input, setInput] = React.useState<string>('')

		const [messageResponse, setMessageResponse] = React.useState<IMessageResponse[] | []>(messages)

		const [loading, setLoading] = React.useState(false)

		const [openFiltersMobile, setOpenFiltersMobile] = React.useState(false)

		const { status } = useSession()

		const theme = useAppSelector((state) => state.theme.theme)

		const contextTutorial = React.useContext(TutorialContext)

		const dispatch = useAppDispatch()

		const messageForUnauthenticatedUser: IMessageResponse = {
			question: input,
			response: 'Неавторизованный юзер',
			tokens: 0,
			start_time: '',
			end_time: '',
			user_id: 0,
			context: false,
		}

		const previewMessage = {
			question: input,
			response: 'ChatGPT обрабатывает ваш запрос, пожалуйста подождите...',
			tokens: 0,
			start_time: ' ',
			end_time: ' ',
			user_id: 0,
			context: false,
		}
		const tutorialSendMessage = (question: string) => {
			if (messageResponse.filter((el) => el.question === 'Как найти наименьшее значение в массиве ?').length > 0) {
				return
			}

			setLoading(true)
			setTimeout(
				() =>
					setMessageResponse((prev) => [
						...prev,
						{
							...previewMessage,
							question,
							response: responseGPT,
						},
					]),
				500
			)
			setLoading(false)
			setInput('')
		}

		React.useEffect(() => {
			if (contextTutorial?.step === 1) {
				setInput('Как найти наименьшее значение в массиве ?')
				return
			}

			if (contextTutorial?.step === 4) {
				tutorialSendMessage(input)
				return
			}

			if (contextTutorial?.step === 5) {
				addToContext({
					...previewMessage,
					question: 'Как найти наименьшее значение в массиве ?',
				})
				return
			}

			removeAllContext()
		}, [contextTutorial?.step])

		const checkModelType = () => {
			const model = typeModels.find((el) => el.key === typeModel)!.value

			if (model === 'gpt-3.5-turbo') {
				return isAdditional ? 'gpt-3.5-turbo-16k' : model
			}

			if (model === 'gpt-4') {
				return isAdditional ? 'gpt-4-32k' : model
			}

			return model
		}

		const sendQuestion = async (question?: string) => {
			if ((status === 'unauthenticated' || status === 'loading') && input.trim() !== '') {
				setInput('')
				setMessageResponse((prev) => [...prev, messageForUnauthenticatedUser])
				return
			}

			if (input.trim() === '' && !question) {
				showErrorUnauthenticated('Напишите сообщение')
				setTimeout(() => showErrorUnauthenticated(''), 3000)
				return
			}

			if (typeModel !== '') {
				setLoading(true)

				setMessageResponse((prev) => [...prev, question ? { ...previewMessage, question: question } : previewMessage])

				const messagesContext = context.map((messages) => messages.question)

				const request_message = question ? [question] : [...messagesContext, input]

				const messagesForSend = {
					request_message,
					type_model: checkModelType(),
					temperature_model: temperatureModel,
					top_p: parameterTopP,
					presence: parameterPresence,
				}

				const { data, isError, error } = await api.sendMessageChatGPT(token, messagesForSend)

				if (isError) {
					showError(decodeError(error, 'Ошибка генерации'))
					setTimeout(() => setMessageResponse((prev) => prev.slice(0, -1)), 2000)
					setLoading(false)
					return
				}

				const new_message = {
					question: question ? question : input,
					response: data?.response,
					tokens: data?.total_tokens,
					start_time: data?.start_time,
					end_time: data?.end_time,
					user_id: 1,
					context: false,
				}

				setLoading(false)
				setInput('')
				setMessageResponse((prev) => prev.slice(0, -1))
				setMessageResponse((prev) => [...prev, new_message])
				dispatch(getUserBalance(token))
			}
		}

		return (
			<>
				<Stack
					className='tutorial-chat-gpt'
					direction='column'
					justifyContent='space-between'
					alignItems='stretch'
					spacing={2}
					sx={{
						borderRight: desktop ? (theme === 'light' ? '1px solid #E1E1E1' : '1px solid transparent') : 'white',
						borderRadius: desktop ? '0' : '13px',
						backgroundColor: desktop ? (theme === 'light' ? '#F8F8F8' : '#4B4B4B') : theme === 'light' ? 'white' : '#4B4B4B',
						padding: desktop ? 4 : 1.5,
						paddingTop: 0,
						paddingBottom: desktop ? 2 : 0,
						width: desktop ? '80%' : '100%',
						height: desktop ? 'calc(100vh - 54px)' : '67vh',

						overflow: 'hidden',
					}}
				>
					<MessagesList device={device} messageResponse={messageResponse} addToContext={addToContext} />
					{desktop && (
						<Box display='flex' alignItems='center' justifyContent='space-between'>
							<TextField
								multiline
								maxRows={2}
								className='tutorial-input'
								fullWidth
								variant='outlined'
								name='chat-text'
								onKeyDown={async (e) => {
									if (e.key === 'Enter') {
										e.preventDefault()
										await sendQuestion()
									}
								}}
								label={''}
								onChange={(e) => setInput(e.target.value)}
								value={input}
								sx={{
									borderRadius: '15px',
									...styleInputWithoutBorderFocus,
									'& label': { color: '#8853FA' },
									backgroundColor: theme === 'light' ? 'white' : '#3D3D3D',
									textarea: {
										color: theme === 'light' ? '#272727' : '#E1E1E1',
									},
									fieldset: {
										borderRadius: '15px',
										border: theme === 'light' ? '1px solid #E1E1E1' : 'none',
									},
								}}
								InputProps={{
									startAdornment: (
										<>
											{typeModel.includes('GPT') && (
												<Context
													deleteAllContextMessage={removeAllContext}
													context={context}
													deleteContextMessage={deleteContextMessage}
												/>
											)}
										</>
									),
									endAdornment: (
										<>
											<Calculation
												isAdditional={isAdditional}
												model={'gpt'}
												prompt={input}
												gptType={typeModel as TypeModelGPT}
												context={context}
											/>
											<InputAdornment
												position='end'
												onClick={async () => {
													if (!loading) {
														await sendQuestion()
													}
												}}
												sx={{
													backgroundColor: '#7F71DF3',
													'&:hover': {
														cursor: 'pointer',
														opacity: [0.9, 0.8, 0.7],
													},
												}}
											>
												{!loading ? (
													<Image
														height={28}
														width={28}
														src={`/svg/chatgpt/send_message${theme === 'light' ? '' : '_dark'}.svg`}
														alt={''}
													/>
												) : (
													<CircularProgress
														size={25}
														thickness={5}
														sx={{
															color: '#7F7DF3',
														}}
													/>
												)}
											</InputAdornment>
										</>
									),
								}}
							/>
						</Box>
					)}
				</Stack>

				{!desktop && (
					<TextField
						style={{ marginTop: '10px' }}
						fullWidth
						name='chat-text'
						label=''
						id='fullWidth'
						onChange={(e) => setInput(e.target.value)}
						value={input}
						sx={{
							borderRadius: '15px',
							...styleInputWithoutBorderFocus,
							'& label': { color: '#8853FA' },
							backgroundColor: theme === 'light' ? 'white' : '#3D3D3D',
							input: {
								color: theme === 'light' ? '#272727' : '#E1E1E1',
								marginLeft: 1,
							},
							fieldset: {
								borderRadius: '15px',
								border: theme === 'light' ? '1px solid #E1E1E1' : 'none',
							},
						}}
						InputProps={{
							startAdornment: (
								<>
									{typeModel.includes('GPT') && (
										<Context
											device={'mobile'}
											deleteAllContextMessage={removeAllContext}
											context={context}
											deleteContextMessage={deleteContextMessage}
										/>
									)}
								</>
							),
							endAdornment: (
								<>
									<Image
										onClick={() => setOpenFiltersMobile(true)}
										style={{
											marginRight: '10px',
											cursor: 'pointer',
										}}
										height={24}
										width={24}
										src={'/svg/dalle/settings.svg'}
										alt={''}
									/>
									<Filters
										device={'mobile'}
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
										open={openFiltersMobile}
										handleCloseFilters={() => setOpenFiltersMobile(false)}
									/>
									<InputAdornment
										position='end'
										onClick={() => sendQuestion()}
										sx={{
											backgroundColor: '#7F71DF3',
											'&:hover': {
												cursor: 'pointer',
												opacity: [0.9, 0.8, 0.7],
											},
										}}
									>
										{!loading ? (
											<Image height={29} width={29} src='/svg/chatgpt/send_message.svg' alt={''} />
										) : (
											<CircularProgress size={25} thickness={5} sx={{ color: '#7F7DF3' }} />
										)}
									</InputAdornment>
								</>
							),
						}}
					/>
				)}
			</>
		)
	}
)

Chat.displayName = 'Chat'
