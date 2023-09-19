import { Dispatch, SetStateAction, useState } from 'react'
import { useSession } from 'next-auth/react'

import { ResponseGetPersons } from '@/src/features/invite-person-in-business'

import { removePerson } from '../api/remove'

export const useRemove = (
	updateList: (persons: ResponseGetPersons) => void,
	email: string
): [open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, removeFn: () => void] => {
	const [open, setOpen] = useState<boolean>(false)

	const { data } = useSession()

	const remove = async () => {
		const result = await removePerson(email, data?.access)

		if (result === null) {
			return [open, setOpen]
		}
		setOpen(false)
		updateList(result)
	}

	return [open, setOpen, remove]
}
