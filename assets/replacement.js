const df = 'https://daringfireball.net'



const prepPage = () => {
	const metaViewport = `<meta content="initial-scale=1, width=device-width, viewport-fit=cover" name="viewport">`
	document.head.insertAdjacentHTML('beforeend', metaViewport)

	document.querySelectorAll('link[rel="stylesheet"]').forEach(stylesheet => stylesheet.remove())
}



(location.href.includes(df)) ? prepPage() : window.open(df, '_blank')
