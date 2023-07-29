{{- $payload := resources.Get `scripts/payload.js` -}}
{{- $payload = $payload | js.Build (dict `format` `esm`) -}}
{{- $payload = $payload.Content -}}
{{- $payload = $payload | replaceRE `// <stdin>\n` `` -}}
{{- $payload = $payload | resources.FromString `payload.js` -}}

javascript:(function(){
	const df = 'https://daringfireball.net'
	const id = 'gorbachev'

	if (location.href.includes(df)) {
		let payload = document.getElementById(id)

		if (payload) payload.remove()

		payload = document.createElement('script')
		payload.id = id
		payload.src = '{{ $payload.Permalink }}'

		document.head.appendChild(payload)
	} else {
		location.href = df
	}
})()
