{{- $replacement := (resources.Get `replacement.js`).Permalink -}}

javascript:(function(){
	const df = 'https://daringfireball.net'

	if (location.href.includes(df)) {
		let replacement = document.createElement('script')
		replacement.src = '{{ $replacement }}'
		document.head.appendChild(replacement)
	} else {
		location.href = df
	}
})()
