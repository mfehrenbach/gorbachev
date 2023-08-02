// Get the path.
baseUrl = document.currentScript.src
baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/'))

// Fade everything out.
document.body.style.background = '#4a525a';
document.body.style.transition = '100ms opacity linear';
document.body.style.opacity =    0;

document.body.addEventListener('transitionend', () => {
	if (event.propertyName == 'opacity') {
		// First run…
		if (typeof replacementStyles == 'undefined') {
			// Flag Windows for CSS.
			if (navigator.appVersion.includes('Win')) document.documentElement.classList.add('windows')



			// Some basic ragging.
			const textRags = [
				'dt > a',
				'h1',
				'h2',
				'h3',
				'li',
				'p',
				'td'
			]
			textRags.forEach(textRag => {
				for (const element of document.querySelectorAll(textRag)) {
					if (element.textContent.split(" ").length > 1) {
						// Prevent orphans the old-fashioned way.
						element.innerHTML = element.innerHTML.replace(/\s\b(?=\S+$)(?!href)/, ' ')
						// Keep 1-and-2-letter words with the following ones.
						element.innerHTML = element.innerHTML.replace(/\s(\b[a-zA-Z]{1,2})\s/g, ' $1 ')
						// And pairs of these (ex: “ of a ”).
						element.innerHTML = element.innerHTML.replace(/\s(\b[a-zA-Z]{1,2})&nbsp;(\b[a-zA-Z]{1,2})\s/g, ' $1 $2 ')
						// 1-to-3-digit numbers with their units.
						element.innerHTML = element.innerHTML.replace(/\s(\b[\d]{1,3})\s/g, ' $1 ')
						// The with their referents.
						element.innerHTML = element.innerHTML.replace(/\s(the)\s/g, ' $1 ')
						// And Oxford ands.
						element.innerHTML = element.innerHTML.replace(/,\s(and)\s/g, ', $1 ')
					}
				}
			})



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
			if (adBlock) {
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
			}



			// Spans on bracketed notes.
			const strongs = document.querySelectorAll('p strong')
			strongs.forEach(paragraph => {
				paragraph = paragraph.parentElement
				paragraph.classList.add('sidenote')
				if (paragraph.textContent.at(0) == '[' && paragraph.textContent.at(-1) == ']') {
					paragraph.innerHTML = paragraph.innerHTML.replace('[', '<span>[</span>')
					paragraph.innerHTML = paragraph.innerHTML.replace(']', '<span>]</span>')
				}
			})



			// Fix keyboard scrolling in Safari, which ignores root `scroll-padding-top`.
			if (navigator.userAgent.includes('AppleWebKit') && !navigator.userAgent.includes('Chrome')) {
				document.addEventListener('keydown', () => {
					let scrollDown = (!event.shiftKey && event.code == 'Space') || event.code == 'PageDown'
					let scrollUp   = (event.shiftKey && event.code == 'Space') || event.code == 'PageUp'
					if (scrollDown || scrollUp) event.preventDefault()
					let scrollDistance = parseInt(getComputedStyle(document.body).getPropertyValue('--scroll--padding'))
					scrollDistance = window.innerHeight * (100 - scrollDistance) / 100
					if (scrollDown) window.scrollBy(0, scrollDistance)
					if (scrollUp) window.scrollBy(0, -scrollDistance)
				})
			}



			// Add return-to-top links.
			const topLink = '<p class="toplink"><a href="#" tabindex="-1">Top <span>↑</span></a></p>'
			const bannerTopLink = Object.assign(document.createElement('div'), { id: 'BannerTop', innerHTML: topLink } ) // One-liner, is this better?
			const sidebarTopLink = Object.assign(document.createElement('div'), { id: 'SidebarTop', innerHTML: topLink } ) // One-liner, is this better?
			document.getElementById('Banner').append(bannerTopLink)
			document.getElementById('Sidebar').append(sidebarTopLink)



			// Adjust the FancyZoom properties a bit.
			window.innerWidth >= 1024 ? minBorder = 96 : minBorder = 32



			// Make the page responsive.
			const metaViewport = '<meta content="initial-scale=1, maximum-scale=1, viewport-fit=cover, width=device-width" name="viewport">'
			document.head.insertAdjacentHTML('beforeEnd', metaViewport)

			// Finally, set up the stylesheet.
			var replacementStyles = `<link href="${baseUrl}/replacement.css" rel="stylesheet">` // Using `var` so it is global.
		}



		// All runs…
		document.querySelectorAll('style').forEach(stylesheet => stylesheet.remove())
		document.querySelectorAll('link[rel=stylesheet]').forEach(stylesheet => stylesheet.remove())
		document.head.insertAdjacentHTML('beforeend', replacementStyles)


		// Fade everything back in.
		setTimeout(() => {
			document.body.style.opacity = 1

			document.body.addEventListener('transitionend', () => {
				if (event.propertyName == 'opacity') document.body.removeAttribute('style')
			}, { once: true })
		}, 500) // Wait a tick, for the drama.
	}
}, { once: true })
