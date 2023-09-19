import { PersonInBusiness } from '@/src/features/invite-person-in-business'

type Roles = 'Владелец' | 'Сотрудник'
export const RoleSelect: Record<PersonInBusiness, Roles> = {
	business_host: 'Владелец',
	business_account: 'Сотрудник',
}

export type InviteRoles = 'Сотрудник' | 'Администратор'

export const inviteRoles = { regular: 'Сотрудник', admin: 'Администратор' }
