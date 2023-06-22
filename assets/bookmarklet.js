{{- $replacement := resources.Get `replacement.scss` -}}
{{- $replacement = $replacement | toCSS (dict `transpiler` `dartsass`) -}}

javascript:(function(){
	const df = 'https://daringfireball.net'

	if (location.href.includes(df)) {
		document.querySelectorAll('link[rel=stylesheet]').forEach(stylesheet => stylesheet.remove())

		const metaViewport =     `<meta content="initial-scale=1, width=device-width, viewport-fit=cover" name="viewport">`
		const replacementStyle = `<link href="{{ $replacement.Permalink }}" rel="stylesheet">`

		if (document.head.hasAttribute('gorbachev')) {
			document.head.insertAdjacentHTML('beforeend', replacementStyle)
		} else {
			document.head.insertAdjacentHTML('beforeend', [metaViewport, replacementStyle])
			document.head.setAttribute('gorbachev', '')
		}
	} else {
		location.href = df
	}
})()
