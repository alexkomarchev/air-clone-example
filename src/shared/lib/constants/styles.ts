import { colorDark, colorLight } from '@/src/shared/lib/constants/colors'

export const TypographyLight = {
	fontWeight: 600,
	fontSize: 17,
	color: colorLight,
}

export const TypographyDark = {
	...TypographyLight,
	color: colorDark,
}
