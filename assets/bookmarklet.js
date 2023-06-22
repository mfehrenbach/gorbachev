{{- $replacement := (resources.Get `replacement.js`).Permalink -}}

javascript:(function(){
	let replacement = document.createElement('script')
	replacement.src = '{{ $replacement }}'
	document.head.appendChild(replacement)
	console.log('Hello, world.')
})()
