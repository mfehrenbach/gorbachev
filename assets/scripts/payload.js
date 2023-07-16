// First run…
if (typeof replacementStyles == 'undefined') {
	// Flag Windows for CSS.
	if (navigator.appVersion.includes('Win')) document.documentElement.classList.add('windows')

	// Make the page responsive.
	const metaViewport = '<meta content="initial-scale=1, width=device-width, viewport-fit=cover" name="viewport">'
	document.head.insertAdjacentHTML('beforeEnd', metaViewport)



	// Add a level of DOM grouping to linked lists, for stickiness.
	const linkedLists = document.querySelectorAll('dl.linkedlist')
	linkedLists.forEach(linkedList => {
		const linkListTitles = linkedList.querySelectorAll('dt')
		linkListTitles.forEach(linkListTitle => {
			let newlinkListTitle = linkListTitle.cloneNode(true)
			const linkListDescription = linkListTitle.nextElementSibling
			const linkListDiv = document.createElement('div')
			linkListDiv.append(newlinkListTitle, linkListDescription)
			linkListTitle.before(linkListDiv)
			linkListTitle.remove()
		})
	})



	// Duplicate the sidebar ad to the main column, for mobile.
	const adBlock = document.getElementById('SidebarMartini')
	let mainAdBlock = adBlock.cloneNode(true)
	mainAdBlock.id = 'MainMartini'
	let firstThing = document.querySelector('#Main > *:first-child')
	if (firstThing.classList.contains('dateline')) firstThing = document.querySelector('#Main > *:nth-child(2)')
	if (firstThing.classList.contains('article')) {
		let adPlacement = null
		// Ideally place it between paragraphs, but not at the start.
		firstThing.querySelectorAll('.article > *:not(h6) + p + p').forEach(paragraph => {
			// But only if not preceded by a colon, that’d be weird.
			if (!adPlacement && paragraph.previousElementSibling.textContent.at(-1) != ':') adPlacement = paragraph
		})
		// Then go after the first blockquote, if need be.
		if (!adPlacement) adPlacement = firstThing.querySelector('.article > blockquote + p')
		if (!adPlacement) adPlacement = firstThing.querySelector('.article > ul > li:nth-child(2) > p:last-child') // It happens.
		if (adPlacement) adPlacement.before(mainAdBlock)
	} else if (firstThing.classList.contains('linkedlist')) {
		firstThing.querySelector('div:first-of-type').appendChild(mainAdBlock) // After the first “definition”.
	}

	// Wrap another layer around the sidebar ad, for stickiness.
	const wrapper = document.createElement('div')
	wrapper.append(...adBlock.children)
	adBlock.appendChild(wrapper)



	// Set up the stylesheet.
	let baseUrl = document.currentScript.src
	baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/'))
	var replacementStyles = `<link href="${baseUrl}/replacement.css" rel="stylesheet">` // Using `var` so it is global.
}



// All runs…
document.querySelectorAll('link[rel=stylesheet]').forEach(stylesheet => stylesheet.remove())
document.head.insertAdjacentHTML('beforeend', replacementStyles)
