import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export const PasswordOptions: RegisterOptions = {
	required: 'Поле пароль обязательно к заполнению!',
	minLength: {
		value: 5,
		message: 'Слишком короткий пароль',
	},
}

export const fieldForStatistics = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
