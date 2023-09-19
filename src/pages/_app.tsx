import React from 'react'
import { Provider } from 'react-redux'
import { StyledEngineProvider } from '@mui/material'
import axios from 'axios'
import * as https from 'https'
import type { AppProps } from 'next/app'
import { Raleway } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'

import { store } from '@/src/main/store/store'

import '@/src/main/styles/globals.css'

axios.defaults.httpsAgent = new https.Agent({
	rejectUnauthorized: false,
})

const inter = Raleway({ subsets: ['latin'] })

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<>
			<style jsx global>{`
				html {
					font-family: ${inter.style.fontFamily};
				}
			`}</style>
			<div>
				<StyledEngineProvider injectFirst>
					<Provider store={store}>
						<SessionProvider session={session} refetchInterval={5 * 60}>
							<Component {...pageProps} />
						</SessionProvider>
					</Provider>
				</StyledEngineProvider>
			</div>
		</>
	)
}

export default appWithTranslation(App)
