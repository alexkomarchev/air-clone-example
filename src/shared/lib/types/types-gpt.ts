import { INeuronModel } from '@/src/pages'
import { IProps } from '@/src/shared/lib/types/entities'

export interface IMessageResponse {
	question: string
	response: string
	tokens: number
	start_time: string
	end_time: string
	user_id: number
	context: boolean
}

export interface ISendMessageResponse {
	data: any | null
	isError: boolean
	error?: any
}
export interface IMessageRequest {
	request_message: string[]
	type_model: string
	temperature_model: number | number[]
	top_p: number | number[]
	presence: number | number[]
}

export interface IChatGPTProps extends IProps {
	messages: IMessageResponse[] | []
	favorites: INeuronModel[] | []
}

export interface ImessageContext {
	question: string
	start_time: string
}
