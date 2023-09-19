import React from 'react'

import { SwitchCustom } from '@/src/shared'

import { changeAccess } from '../api/change-access'
import { AllowedModels } from '../api/types'
type SwitchAccess = {
	isAllowed: boolean
	title: string
	token?: string
	updateAccessModels: (models: AllowedModels[]) => void
}
export const SwitchAccess: React.FC<SwitchAccess> = ({ isAllowed, title, token, updateAccessModels }) => {
	const change = () => {
		changeAccess(token, isAllowed, title).then((res) => {
			if (res.length === 0) {
				return
			}
			updateAccessModels(res)
		})
	}

	return <SwitchCustom checked={isAllowed} onChange={change} />
}
