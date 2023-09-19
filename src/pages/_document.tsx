import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='ru'>
			<Head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                ym(93475901, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
                  });
              `,
					}}
				/>
			</Head>
			<body>
				<noscript>
					<div>
						<img src='https://mc.yandex.ru/watch/93475901' style={{ position: 'absolute', left: '-9999px' }} alt='' />
					</div>
				</noscript>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
