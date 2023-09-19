const price = {
	'1024x1024': 8.5,
	'512x512': 7.65,
	'256x256': 6.8,
}
export const calculatingDalle = (count: number, quality: '1024x1024' | '512x512' | '256x256') => {
	return price[quality] * count
}
