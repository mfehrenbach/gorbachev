
javascript:(function(){
	const df = 'https://daringfireball.net'

	if (location.href.includes(df)) {
		let replacement = document.createElement('script')
		replacement.src = '{{ $replacement }}'
		document.head.appendChild(replacement)
		const metaViewport = `<meta content="initial-scale=1, width=device-width, viewport-fit=cover" name="viewport">`
		document.querySelectorAll('link[rel=stylesheet]').forEach(stylesheet => stylesheet.remove())
		document.head.insertAdjacentHTML('beforeend', [metaViewport])
	} else {
		location.href = df
	}
})()
