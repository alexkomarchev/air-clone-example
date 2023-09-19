import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useAutoLoad = (desktop: boolean): [boolean, Dispatch<SetStateAction<boolean>>] => {
	const [fetching, setFetching] = useState(true)

	useEffect(() => {
		const isMobile = desktop ? document : document.getElementById('messages-list')

		const scrollHandler = (e: any) => {
			if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
				setFetching(true)
			}
		}
		const scrollHandlerMobile = (e: any) => {
			if (!desktop && e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 100) {
				setFetching(true)
			}
		}

		isMobile?.addEventListener('scroll', desktop ? scrollHandler : scrollHandlerMobile)

		return function () {
			isMobile?.removeEventListener('scroll', desktop ? scrollHandler : scrollHandlerMobile)
		}
	}, [desktop])

	return [fetching, setFetching]
}
