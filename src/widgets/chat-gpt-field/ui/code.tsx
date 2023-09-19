import React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import oneDark from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark'

interface CodeProps {
	node: any
	inline: boolean | undefined
	className: string | undefined
	children: React.ReactNode & React.ReactNode[]
	language: string | undefined
}
const Code: React.FC<CodeProps> = ({ inline, className, children, node, language, ...props }) => {
	return (
		<SyntaxHighlighter
			{...props}
			//eslint-disable-next-line react/no-children-prop
			children={String(children).replace(/\n$/, '')}
			style={oneDark}
			language={language}
			PreTag='div'
		/>
	)
}

export default Code
