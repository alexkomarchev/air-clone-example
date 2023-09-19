import React from 'react'

export const useShowData = (): {
	error: string
	showError: (message: string) => void
} => {
	const [message, setError] = React.useState('')

	function showError(message: string = 'Произошла ошибка') {
		setError(message)
		setTimeout(() => setError(''), 5000)
	}

	return { error: message, showError }
}
