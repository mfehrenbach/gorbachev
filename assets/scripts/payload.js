// First run…
if (typeof replacementStyles == 'undefined') {
	// Make the page responsive.
	const metaViewport = '<meta content="initial-scale=1, width=device-width, viewport-fit=cover" name="viewport">'
	document.head.insertAdjacentHTML('beforeEnd', metaViewport)

	// Flag Windows for CSS.
	if (navigator.appVersion.includes('Win')) document.documentElement.classList.add('windows')

	// Duplicate the ad placement for mobile.
	let adBlock = document.getElementById('SidebarMartini')
	adBlock = adBlock.cloneNode(true)
	adBlock.id = 'MainMartini'
	document.querySelector('#Main > *:first-child').after(adBlock)

	// Set up the stylesheet.
	let baseUrl = document.currentScript.src
	baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/'))
	var replacementStyles = `<link href="${baseUrl}/replacement.css" rel="stylesheet">` // Using `var` so it is global.

	// Toss the empty/conditional Linked List item from nav.
	let linkedList = document.querySelector('#Sidebar > ul script').parentNode
	linkedList.remove()
}



// All runs…
document.querySelectorAll('link[rel=stylesheet]').forEach(stylesheet => stylesheet.remove())
document.head.insertAdjacentHTML('beforeend', replacementStyles)
