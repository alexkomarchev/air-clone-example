import { RegisterOptions } from 'react-hook-form/dist/types/validator'

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

const PHONE_REGEXP = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
export const emailOptions: RegisterOptions = {
	required: 'Поле email обязательно к заполенению!',
	minLength: {
		value: 5,
		message: 'Слишком короткий email',
	},
	pattern: {
		value: EMAIL_REGEXP,
		message: 'Введите валидный email',
	},
}

export const phoneOptions: RegisterOptions = {
	required: {
		value: true,
		message: 'Данное поле обязательно к заполнению',
	},
	pattern: {
		value: PHONE_REGEXP,
		message: 'Пожалуйста введите валидный номер телефона',
	},
}

export const onlyNumbersOption: RegisterOptions = {
	required: {
		value: true,
		message: 'Поле обязательно к заполенению',
	},
	pattern: {
		value: /^[0-9]+$/,
		message: 'Пожалуйста введите лимит числом',
	},
}
