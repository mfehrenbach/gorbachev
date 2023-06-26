{{- $replacement := resources.Get `replacement.scss` -}}
{{- $replacement = $replacement | toCSS (dict `transpiler` `dartsass`) -}}

javascript:(function(){
	const df =   'https://daringfireball.net'
	const html = document.documentElement

	if (location.href.includes(df)) {
		document.querySelectorAll('link[rel=stylesheet]').forEach(stylesheet => stylesheet.remove())

		const metaViewport =     `<meta content="initial-scale=1, width=device-width, viewport-fit=cover" name="viewport">`
		const replacementStyle = `<link href="{{ $replacement.Permalink }}" rel="stylesheet">`

		if (html.classList.contains('gorbachev')) {
			document.head.insertAdjacentHTML('beforeend', replacementStyle)
		} else {
			if (navigator.appVersion.includes("Win")) html.classList.add('windows')
			document.head.insertAdjacentHTML('beforeend', [metaViewport, replacementStyle])
			html.classList.add('gorbachev')
		}
	} else {
		location.href = df
	}
})()
