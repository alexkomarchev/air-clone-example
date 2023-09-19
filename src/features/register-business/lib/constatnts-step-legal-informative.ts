import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export const companyNameOptions: RegisterOptions = {
	required: {
		value: true,
		message: 'Поле "Наименование организации" обязательно к заполнению',
	},
	minLength: {
		value: 5,
		message: 'Укажите верное название компании',
	},
}

export const innOptions: RegisterOptions = {
	required: {
		value: true,
		message: 'Поле "ИНН" обязательно к заполнению',
	},
	pattern: {
		value: /[0-9]/,
		message: 'ИНН может содержать только цифры',
	},
	validate: (value: any) => value.length === 10 || 'ИНН должен быть длиной 10 цифр',
}

export const ogrnOptions: RegisterOptions = {
	required: {
		value: true,
		message: 'Поле "ОГРН" обязательно к заполнению',
	},
	pattern: {
		value: /[0-9]/,
		message: 'ОГРН может содержать только цифры',
	},
	validate: (value: any) => value.length === 13 || 'ОГРН должен быть длиной 13 цифр',
}
