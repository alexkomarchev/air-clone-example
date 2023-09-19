import { IProps } from '@/src/shared/lib/types/entities'
import { Styles } from '@/src/widgets/filters-sd/ui/filters'

export type TImageFormat = '512x512' | '640x384' | '384x640' | '768x512' | '512x768' | '1024x1024'
export type TClipGuidancePresets = 'FAST_BLUE' | 'FAST_GREEN' | 'Без фильтров' | 'SIMPLE' | 'SLOW' | 'SLOWER' | 'SLOWEST'
export type TSamplerTypes =
	| 'DDIM'
	| 'DDPM'
	| 'K_DPMPP_2M'
	| 'K_DPMPP_2S_ANCESTRAL'
	| 'K_DPM_2'
	| 'K_DPM_2_ANCESTRAL'
	| 'K_EULER'
	| 'K_EULER_ANCESTRAL'
	| 'K_HEUN'
	| 'K_LMS'

export type TGeneratingModel =
	| 'stable-diffusion-v1'
	| 'stable-diffusion-v1-5'
	| 'stable-diffusion-512-v2-0'
	| 'stable-diffusion-768-v2-0'
	| 'stable-diffusion-512-v2-1'
	| 'stable-diffusion-768-v2-1'
	| 'stable-diffusion-xl-beta-v2-2-2'
        | 'stable-diffusion-xl-1024-v0-9'
        | 'stable-diffusion-xl-1024-v1-0'

export interface ISDFilters extends IProps {
	formatImage: TImageFormat
	stepsImage: number | string | Array<number | string>
	numberImages: number | number[] | undefined
	sampleType: TSamplerTypes
	samplerTypes: TSamplerTypes[]
	cfgScale: number | string | Array<number | string>
	clipGuidancePreset: TClipGuidancePresets
	clipGuidancePresets: TClipGuidancePresets[]
	formatImages: TImageFormat[]
	generatingModel: TGeneratingModel
	isTranslate: boolean
	style: Styles

	changeFormatImage: (e: TImageFormat) => void
	changeClipGuidancePreset: (e: TClipGuidancePresets) => void
	changeSampleType: (e: TSamplerTypes) => void
	changeStepsImage: (e: Event, current: number | number[]) => void
	changeNumberImage: (e: Event, current: number | number[]) => void
	changeCfgScale: (e: Event, current: number | number[]) => void
	changeGeneratingModel: (e: TGeneratingModel) => void
	changeIsTranslate: () => void
	changeStyle: (e: Styles) => void

	resetSettings: () => void
}
