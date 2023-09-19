import { INeuronModel } from '@/src/pages'
import { IProps } from '@/src/shared/lib/types/entities'

export interface IResponseSD {
	question: string
	link: string
	created_at: string
}

export interface ISDProps extends IProps {
	favorites: INeuronModel[] | []
}
