const descriptionChatGPT =
	'Модели GPT-3.5 могут понимать и генерировать естественный язык или код. Наша самая мощная и экономичная модель серии GPT-3.5 - gpt-3.5-turbo, которая была оптимизирована для чата, но также хорошо работает и для традиционных операций по выполнению заданий.'
const descriptionChatGPT4 =
	'GPT-4 более творческий и совместный, чем когда-либо прежде.  Он может генерировать, редактировать и повторять с пользователями творческие и технические задачи письма, такие как сочинение песен, написание сценариев или изучение стиля письма пользователя.\n' +
	'GPT-4 может принимать изображения в качестве входных данных и генерировать подписи, классификации и анализы.\n' +
	'GPT-4 способен обрабатывать более 25 000 слов текста, что позволяет использовать такие варианты использования, как создание длинного контента, расширенные беседы, а также поиск и анализ документов.'

const advantagesChatGPT = ''

const descriptionDaVinci =
	'Самая мощная модель в серии GPT-3. Может выполнять любую задачу эффективнее своих предшественников и демонстрировать результат, часто более высокого качества, более развернутый и гораздо более точный. Обрабатывает до 4000 токенов за запрос.'
const advantagesDaVinci =
	'Обрабатывает максимально сложные запросы, выводит причину и следствие в любом виде контента, способен работать с нестандартным подходом, ищет, анализирует и обобщает информацию по запросу, тратит в 10 раз больше токенов, чем модели ChaGPT-35 и Curie.'
const warningDaVinci = 'Тратит в 10 раз больше токенов, чем модели ChatGPT и Curie.'

const descriptionCurie = 'Очень мощный, при этом быстрее и дешевле, чем text-DaVinci-003.'
const advantagesCurie = 'Способен выполнять языковой перевод,  классифицировать и обобщать информацию, соблюдать заданный эмоциональный тон.'

const descriptionBabbage = 'Способен выполнять простые задачи, очень быстрый и недорогой.'
const advantagesBabbage = 'Способен классифицировать информацию по заданным параметрам и осуществлять семантический поиск.'

const descriptionAda = 'Способен выполнять простые задачи. В серии GPT-3 является самой быстрой моделью по самой низкой цене.'
const advantagesAda = 'Способен синтаксически  анализировать текст, выполнять базовую классификацию, подбирать ключевые слова.'

export const ParameterTopP =
	'Тор_p - альтернатива температуре. Не\n' +
	'советуем менять top_p и температуру\n' +
	'одновременно. Меняется в интервале от 0\n' +
	'до 1. Более высокие значения дают более\n' +
	'креативные ответы.\n'

export const ParameterTemperature =
	'Температура влияет на вероятность\n' +
	'случайного ответа: чем выше температура,\n' +
	'тем больше вероятность получить\n' +
	'креативный ответ. Наоборот, при низкой\n' +
	'температуре ответ будет более точным и\n' +
	'предсказуемым. Меняется в интервале от\n' +
	'0 до 1. Значение по-умолчанию 0.5.\n'

export const ParameterPresencePenalty =
	'Максимальное количество токенов для\n' +
	'генерации ответа ботом. Токен это часть\n' +
	'слова или слово целиком. Бот оперирует\n' +
	'токенами, разбивая весь текст на токены.\n' +
	'750 слов это в среднем 1000 токенов.'

export interface ITypeModels {
	key: string
	value: string
	description: string
	advantages?: string
	warning?: string
}

export const typeModels: ITypeModels[] = [
	{
		key: 'GPT-4',
		value: 'gpt-4',
		description: descriptionChatGPT4,
	},
	{
		key: 'GPT-3.5',
		value: 'gpt-3.5-turbo',
		description: descriptionChatGPT,
	},
	{
		key: 'DaVinci',
		value: 'text-davinci-003',
		description: descriptionDaVinci,
		advantages: advantagesDaVinci,
		warning: warningDaVinci,
	},
	{
		key: 'Curie',
		value: 'text-curie-001',
		description: descriptionCurie,
		advantages: advantagesCurie,
	},
	{
		key: 'Babbage',
		value: 'text-babbage-001',
		description: descriptionBabbage,
		advantages: advantagesBabbage,
	},
	{
		key: 'Ada',
		value: 'text-ada-001',
		description: descriptionAda,
		advantages: advantagesAda,
	},
]

export type TypeModelGPT = 'gpt-3.5-turbo' | 'text-davinci-003' | 'text-curie-001' | 'text-babbage-001' | 'text-ada-001'
