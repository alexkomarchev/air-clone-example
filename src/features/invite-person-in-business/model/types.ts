export type PersonInBusiness = 'business_host' | 'business_account'

export type AcceptanceStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled'

export type ResponseGetPersons = {
	email: string
	account_type: PersonInBusiness
	acceptance_status: AcceptanceStatus
	created_at: string
	updated_at: string
	token_limit: string
}
