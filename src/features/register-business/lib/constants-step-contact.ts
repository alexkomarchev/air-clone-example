import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export const nameOptions: RegisterOptions = {
	required: {
		value: true,
		message: 'Данное поле обязательно к заполнению',
	},
	minLength: {
		value: 5,
		message: 'Укажите верное значение для поля',
	},
}
