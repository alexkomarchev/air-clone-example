/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
console.log('API HOST: ' + process.env.NEXT_PUBLIC_API_HOST)
const nextConfig = {
	i18n,
	webpack(config, { isServer, dev }) {
		config.experiments = {
			asyncWebAssembly: true,
			layers: true,
		}

		return config
	},
	reactStrictMode: false,
	images: {
		domains: ['195.93.252.114', 'app.air.fail', 'air_django', '79.133.181.83', 'images.air.fail', 'storage.yandexcloud.net', 'dev.air.fail'],
	},
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: false,
})

module.exports = withBundleAnalyzer(nextConfig)
