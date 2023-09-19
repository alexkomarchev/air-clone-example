export type FieldActivity = 'IT' | 'Маркетинг' | 'Финансы' | 'Туризм' | 'Образование' | 'Коммерция' | 'Прочее'
export type Frequency = 'Редко' | 'Временами' | 'Часто'
export const FieldActivitySelect = {
	IT: 'IT',
	marketing: 'Маркетинг',
	finance: 'Финансы',
	tourism: 'Туризм',
	education: 'Образование',
	commerce: 'Коммерция',
	other: 'Прочее',
}

export enum FrequencySelect {
	rare = 'Редко',
	sometimes = 'Временами',
	regular = 'Часто',
}
