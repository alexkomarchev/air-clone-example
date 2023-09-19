export const sliceAudioLink = (title: string) => {
	if (title.length > 30) {
		return title.slice(0, 15) + '... ' + title.slice(-4)
	}

	return title
}
