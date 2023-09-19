import { AcceptanceStatus } from '@/src/features/invite-person-in-business/model/types'

export const translateEmailStatus = (status: AcceptanceStatus) => {
	switch (status) {
		case 'accepted':
			return 'Активен'
		case 'pending':
			return 'Приглашен'
		default:
			return 'Приглашен'
	}
}
