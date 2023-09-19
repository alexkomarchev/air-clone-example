import axios from 'axios'

import { FieldActivity, FieldActivitySelect, Frequency, FrequencySelect } from '@/src/features/register-business/lib/constants-step-information'
import { API_URL } from '@/src/shared/lib/constants'

import { DataForCreate } from '../../model/stepper-slice'

import { DataForCreateBusiness } from './types'

export const createAccount = async (information: DataForCreate, token: string | null) => {
	const indexOfS = Object.values(FrequencySelect).indexOf(information.frequency as unknown as FrequencySelect)

	const companySector = Object.entries(FieldActivitySelect).find(([key, value]) => value === information.fieldActivity)

	const data: DataForCreateBusiness = {
		company_name: information.companyName,
		company_sector: companySector ? (companySector[0] as FieldActivity) : 'IT',
		ITN: +information.inn,
		corporate_email: information.email,
		corporate_phone: information.phone,
		PSRN: +information.ogrn,
		planned_amount_of_workers: information.numberStuff,
		preferred_name: information.name,
		usage_intensity: Object.keys(FrequencySelect)[indexOfS] as Frequency,
		job_title: information.job_title,
	}

	try {
		const { status } = await axios.post<DataForCreateBusiness>(API_URL + '/auth/business-host/create', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return status
	} catch (err) {
		return err
	}
}
