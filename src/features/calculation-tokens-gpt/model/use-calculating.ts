import React from 'react'
import { encoding_for_model } from '@dqbd/tiktoken'

import { costModel } from '@/src/features/calculation-tokens-gpt/lib/constants'
import { calculatingDalle } from '@/src/features/calculation-tokens-gpt/model/calculating-dalle'
import { ImessageContext } from '@/src/shared/lib/types/types-gpt'
import { TypeModelGPT, typeModels } from '@/src/widgets/filters-gpt/lib/constants'

const getFullModelTypeName = (name: string): TypeModelGPT => {
	return typeModels.filter((el) => el.key === name)[0].value as TypeModelGPT
}

const getTransformPrice = (price: number, isGpt: boolean = false) => {
	if (price === 0) {
		return '0'
	}

	return price < 1 ? ' < 1' : `${isGpt ? '≈' : ''} ${price.toFixed(2).replace('.', ',')}`
}

const checkIsAdditional = (model: string, isAdditional?: boolean): any => {
	if (model === 'gpt-3.5-turbo') {
		return isAdditional ? 'gpt-3.5-turbo-16k' : model
	}

	if (model === 'gpt-4') {
		return isAdditional ? 'gpt-4-32k' : model
	}

	return model
}
export const useCalculating = (
	model: 'gpt' | 'dalle' | 'sd',
	count?: number,
	quality?: any,
	prompt?: string,
	gptType?: TypeModelGPT,
	isAdditionalCtx?: boolean,
	context?: ImessageContext[]
): string => {
	if (model === 'dalle') {
		return getTransformPrice(calculatingDalle(count as number, quality))
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const modelFullName = React.useMemo(() => getFullModelTypeName(gptType as TypeModelGPT), [gptType])

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const encoding = React.useMemo(() => encoding_for_model(modelFullName), [gptType])

	const tokens =
		context?.length === 0
			? encoding.encode(prompt as string).length
			: encoding.encode((prompt as string) + context?.map((el) => el.question).toString()).length

	const price = prompt ? costModel[checkIsAdditional(modelFullName, isAdditionalCtx)] * tokens + 0.1 : 0

	return getTransformPrice(price, true)
}
