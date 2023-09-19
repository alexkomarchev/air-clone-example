import { useEffect, useState } from 'react'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

import { innOptions, ogrnOptions } from '../../lib/constatnts-step-legal-informative'

const validateInnForIP = (value: any) => value.length === 12 || 'ИНН для ИП должен быть длиной 12 цифр'
const validateOgrnForIp = (value: any) => value.length === 15 || 'ОГРН для ИП должен быть длиной 15 цифр'

export const useCheckTypeCompany = (company?: string): [{ inn: RegisterOptions; ogrn: RegisterOptions }, boolean] => {
	const [rulesData, setRulesData] = useState({ inn: innOptions, ogrn: ogrnOptions })

	const [isIP, setIsIP] = useState(false)

	useEffect(() => {
		if (!company) {
			return
		}

		if (company.slice(0, 2) !== 'ИП') {
			setIsIP(false)
			setRulesData({ inn: innOptions, ogrn: ogrnOptions })
			return
		}
		setIsIP(true)
		setRulesData((prev) => {
			return { ...prev, inn: { ...innOptions, validate: validateInnForIP }, ogrn: { ...ogrnOptions, validate: validateOgrnForIp } }
		})
	}, [company])

	return [rulesData, isIP]
}
