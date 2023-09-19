export { default } from 'next-auth/middleware'

export const config = {
	matcher: ['/404', '/account', '/admin', '/api-keys', '/chatgpt', '/dalle', '/', '/kandinsky', '/stable-diffusion', '/whisper', '/business/'],
}
