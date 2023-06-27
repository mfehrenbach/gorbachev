// First run…
if (typeof replacementStyles == 'undefined') {
	const metaViewport = '<meta content="initial-scale=1, width=device-width, viewport-fit=cover" name="viewport">'

	document.head.insertAdjacentHTML('beforeEnd', metaViewport)

	if (navigator.appVersion.includes('Win')) document.documentElement.classList.add('windows')

	let baseUrl = document.currentScript.src
	baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/'))

	var replacementStyles = `<link href="${baseUrl}/replacement.css" rel="stylesheet">` // Using `var` so it is global.
}



// All runs…
document.querySelectorAll('link[rel=stylesheet]').forEach(stylesheet => stylesheet.remove())
document.head.insertAdjacentHTML('beforeend', replacementStyles)
