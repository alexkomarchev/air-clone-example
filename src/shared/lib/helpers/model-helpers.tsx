export const translateTypeModel = (type: string): string => {
	if (type === 'image') {
		return 'Изображения'
	}

	if (type === 'text') {
		return 'Текст'
	}

	return 'Аудио'
}
