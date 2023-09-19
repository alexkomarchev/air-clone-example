import { FieldActivity, Frequency } from '../../lib/constants-step-information'

export type DataForCreateBusiness = {
	company_sector: FieldActivity
	planned_amount_of_workers: number
	usage_intensity: Frequency
	ITN: number
	PSRN: number
	company_name: string
	preferred_name: string
	corporate_email: string
	corporate_phone: string
	job_title: string
}
