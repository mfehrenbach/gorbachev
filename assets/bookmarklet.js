{{- $replacement := resources.Get `replacement.scss` -}}
{{- $replacement = $replacement | toCSS (dict `transpiler` `dartsass`) -}}

javascript:(function(){
	const df = 'https://daringfireball.net'

	if (location.href.includes(df)) {
		const metaViewport = `<meta content="initial-scale=1, width=device-width, viewport-fit=cover" name="viewport">`
		const replacementStyle = `<link href="{{ $replacement.Permalink }}" rel="stylesheet">`

		document.querySelectorAll('link[rel=stylesheet]').forEach(stylesheet => stylesheet.remove())

		document.head.insertAdjacentHTML('beforeend', [metaViewport])
		document.head.insertAdjacentHTML('beforeend', replacementStyle)
	} else {
		location.href = df
	}
})()
