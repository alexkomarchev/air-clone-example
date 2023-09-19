import React from 'react'

export const useAutoScroll = (depend: any) => {
	const refScroll = React.useRef() as any

	React.useEffect(() => {
		const block = refScroll.current
		const time = setTimeout(() => {
			if (block) {
				block.scrollTop = block.scrollHeight
			}
		}, 250)

		return () => clearTimeout(time)
	}, [depend])

	return refScroll
}
