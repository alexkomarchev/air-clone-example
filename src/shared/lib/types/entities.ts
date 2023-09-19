export type TDevice = 'mobile' | 'desktop'
export interface IProps {
	device: TDevice
	token: string | null
	theme?: 'dark' | 'light'
}

export type TDeviceProp = {
	device: TDevice
}
