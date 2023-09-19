import React, { memo, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Box, Slide, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import remarkGfm from 'remark-gfm'

import { useAppSelector } from '@/src/main/store/store'
import { useAutoScroll } from '@/src/shared/lib/hooks'
import { IMessageResponse } from '@/src/shared/lib/types/types-gpt'
import TooltipContext from '@/src/widgets/chat-gpt-field/ui/tooltip-context'

import '../styles.module.css'

interface IMessagesList {
	device: 'mobile' | 'desktop'
	messageResponse: IMessageResponse[] | null
	addToContext: (message: IMessageResponse) => void
	sendMessage?: (title: string) => void
}

const MessagesList: React.FC<IMessagesList> = ({ messageResponse, device, addToContext }) => {
	const refScroll = useAutoScroll(messageResponse)

	const desktop = device === 'desktop'

	const theme = useAppSelector((state) => state.theme.theme)

	const { status } = useSession()

	const [isNewMessage, setIsNewMessage] = React.useState(false)

	useEffect(() => {
		setIsNewMessage(true)
	}, [messageResponse])

	const LazyCode = dynamic(() => import('./code'))

	return (
		<Box
			sx={{
				overflowY: 'scroll',
				overflowX: 'hidden',
				'::-webkit-scrollbar': {
					display: 'none',
				},
				paddingRight: desktop ? 2 : 0,
				paddingLeft: desktop ? 1 : 0,
			}}
			ref={refScroll}
		>
			{messageResponse?.length === 0 && status === 'authenticated' ? (
				<></>
			) : (
				messageResponse?.map((message) => {
					return (
						<span className='tutorial-message' key={message.start_time}>
							<Slide className='tutorial-message-me' direction='left' in={isNewMessage} mountOnEnter unmountOnExit>
								<Box
									key={message.start_time}
									onClick={() => addToContext(message)}
									sx={{
										width: 'fit-content',
										marginLeft: 'auto',
										maxWidth: desktop ? '68%' : '100%',
										marginTop: 2,
										marginBottom: 2,
									}}
								>
									<Stack direction='row' justifyContent='end' alignItems='center'>
										<Typography
											variant='body2'
											sx={{
												color: theme === 'light' ? '#868686' : '#A6A5A5',
												lineHeight: '19.6px',
												fontSize: '13px',
												fontWeight: '600',
												marginLeft: 1,
											}}
										>
											{message.start_time.slice(10, 16).replace('T', ' ')}
										</Typography>
									</Stack>
									<TooltipContext>
										<Typography
											sx={{
												padding: '10px 15px',
												backgroundColor: '#7F7DF3',
												borderRadius: '13px',
												color: '#FFFFFF',
												lineHeight: '21px',
												fontSize: '15px',
												fontWeight: '400px',
												marginTop: 0.4,
												textAlign: 'left',
												'&:hover': {
													cursor: 'pointer',
												},
											}}
										>
											{message.question.toString()}
										</Typography>
									</TooltipContext>
								</Box>
							</Slide>
							<Slide direction='right' in={isNewMessage} mountOnEnter unmountOnExit>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										marginTop: 2,
										marginBottom: 2,
									}}
								>
									{desktop && (
										<Box sx={{ marginRight: 1 }}>
											<Image height={36} width={36} src='/svg/chatgpt/avatar.svg' alt={''} />
										</Box>
									)}
									<Box
										sx={{
											paddingLeft: 0,
											width: 'fit-content',
											maxWidth: desktop ? '68%' : '100%',
											marginRight: 'auto',
											overflow: 'hidden',
										}}
									>
										<Stack direction='row' justifyContent='space-between'>
											<Typography
												variant='body2'
												sx={{
													color: theme === 'light' ? '#868686' : '#A6A5A5',
													lineHeight: '16.8px',
													fontSize: '13px',
													fontWeight: '600',
													marginRight: 2,
												}}
											>
												ChatGPT
											</Typography>
											<Typography
												variant='body2'
												sx={{
													color: theme === 'light' ? '#868686' : '#A6A5A5',
													lineHeight: '19.6px',
													fontSize: '13px',
													fontWeight: '600',
													marginLeft: 2,
												}}
											>
												{message.end_time.slice(10, 16).replace('T', ' ')}
											</Typography>
										</Stack>
										<Box
											sx={{
												padding: '15px 23px',
												backgroundColor: desktop
													? theme === 'light'
														? 'white'
														: '#3D3D3D'
													: theme === 'light'
													? 'white'
													: '#3D3D3D',
												color: theme === 'light' ? '#5E5E5E' : '#A6A5A5',
												boxShadow: 'none',
												lineHeight: '22.5px',
												fontSize: '15px',
												marginTop: 0.5,
												textAlign: 'left',
												fontFamily: 'Raleway,sans-serif',
												borderRadius: '13px',
												'&  p': {
													color: 'inherit',
												},
											}}
										>
											<ReactMarkdown
												remarkPlugins={[remarkGfm]}
												components={{
													code({ node, inline, className, children, ...props }) {
														const match = /language-(\w+)/.exec(className || '')
														return !inline && match ? (
															<LazyCode
																inline={inline}
																className={className}
																node={node}
																language={match[1]}
															>
																{children}
															</LazyCode>
														) : (
															<>
																<code style={{ borderRadius: 15 }} {...props} className={className}>
																	{children}
																</code>
															</>
														)
													},
												}}
											>
												{message.response}
											</ReactMarkdown>
										</Box>
									</Box>
								</Box>
							</Slide>
						</span>
					)
				})
			)}
		</Box>
	)
}

export default memo(MessagesList)
