import { useAppSelector } from '@/src/main/store/store'

interface IThemeAndDevice {
	theme: 'dark' | 'light'
	desktop: boolean
}
export const useThemeAndDevice = (device?: 'desktop' | 'mobile'): IThemeAndDevice => {
	const theme = useAppSelector((state) => state.theme.theme)

	const desktop = device === 'desktop'

	return { theme, desktop }
}
