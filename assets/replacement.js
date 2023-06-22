const processPage = () => {
	const metaViewport = `<meta content="initial-scale=1, width=device-width, viewport-fit=cover" name="viewport">`
	document.head.insertAdjacentHTML('beforeend', metaViewport)

	document.querySelectorAll('link[rel="stylesheet"]').forEach(stylesheet => stylesheet.remove())
}



processPage()
