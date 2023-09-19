import { accountApi } from '@/src/shared/api/account-endpoints'

export const authTelegram = async (email: any, password: any) => {
	const user = await accountApi.loginByEmail(email, password)

	if (user !== null) {
		;(window as any).Telegram.WebApp.sendData(user.token.access)
	}
}
