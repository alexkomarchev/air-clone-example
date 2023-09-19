import React from 'react'

import { change } from '@/src/entities/theme'
import { useAppDispatch, useAppSelector } from '@/src/main/store/store'

export const useTheme = () => {
	const theme = useAppSelector((state) => state.theme.theme)

	const dispatch = useAppDispatch()

	React.useEffect(() => {
		dispatch(change(localStorage.getItem('theme') || 'light'))
		document.documentElement.dataset.theme = theme
	}, [theme])
}
