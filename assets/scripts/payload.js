// First run…
if (typeof replacementStyles == 'undefined') {
	// Make the page responsive.
	const metaViewport = '<meta content="initial-scale=1, width=device-width, viewport-fit=cover" name="viewport">'
	document.head.insertAdjacentHTML('beforeEnd', metaViewport)

	// Flag Windows for CSS.
	if (navigator.appVersion.includes('Win')) document.documentElement.classList.add('windows')

	// Duplicate to the main column, for mobile.
	const firstThing = document.querySelector('#Main > *:first-child')
	const adBlock = document.getElementById('SidebarMartini')
	let mainAdBlock = adBlock.cloneNode(true)
	mainAdBlock.id = 'MainMartini'
	if (firstThing.classList.contains('article')) {
		firstThing.querySelector('*:nth-child(5)').after(mainAdBlock) // This could be smarter.
	} else if (firstThing.classList.contains('linkedlist')) {
		firstThing.querySelector('dd:first-of-type').after(mainAdBlock) // After the first “definition”.
	}

	// Wrap another layer around the sidebar ad, for stickiness.
	const wrapper = document.createElement('div')
	wrapper.append(...adBlock.children)
	adBlock.appendChild(wrapper)

	// Toss the empty/conditional Linked List item from nav.
	const linkedList = document.querySelector('#Sidebar > ul script').parentNode
	linkedList.remove()

	// Set up the stylesheet.
	let baseUrl = document.currentScript.src
	baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/'))
	var replacementStyles = `<link href="${baseUrl}/replacement.css" rel="stylesheet">` // Using `var` so it is global.
}



// All runs…
document.querySelectorAll('link[rel=stylesheet]').forEach(stylesheet => stylesheet.remove())
document.head.insertAdjacentHTML('beforeend', replacementStyles)
