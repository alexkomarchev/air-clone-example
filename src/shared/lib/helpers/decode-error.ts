export const decodeError = (err: any, defaultErr: string) => {
	if (err.response?.data.detail?.includes('Token balance')) {
		return 'Не хватает ' + err.response.data.detail.split(' ').filter(Boolean).at(-2) + ' токена'
	}

	return defaultErr
}
