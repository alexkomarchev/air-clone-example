import { INeuronModel } from '@/src/pages'
import { IProps } from '@/src/shared/lib/types/entities'

export interface IImagesResponse {
	question: string
	link: string
}

export interface IDalleRequest {
	request_message: string
	format_image: string
	number_image: number
}

export interface IDalleProps extends IProps {
	favorites: INeuronModel[] | []
}
