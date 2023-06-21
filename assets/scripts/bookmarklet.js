{{- $payload := (resources.Get `scripts/payload.js`).Permalink -}}

let payload = document.createElement('script')
payload.src = '{{ $payload }}'
document.head.appendChild(payload)
