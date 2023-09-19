export const convertTokenValue = (value: string): string => {
	return Math.floor(+value) / 1000 + ' 000'
}
