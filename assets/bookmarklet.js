{{- $payload := (resources.Get `payload.js`).Permalink -}}

javascript:(function(){
	let payload = document.createElement('script')
	payload.src = '{{ $payload }}'
	document.head.appendChild(payload)
})()
