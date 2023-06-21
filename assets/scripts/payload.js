const df = 'https://daringfireball.net'



const prepPage = () => {
	alert('JS loaded!')
}



(location.href.includes(df)) ? prepPage() : window.open(df, '_blank')
