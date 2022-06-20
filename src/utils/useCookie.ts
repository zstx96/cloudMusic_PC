export const useCookie = () => {
	const setCookie = (token) => {
		const date = new Date()
		date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000)
		document.cookie = `token=${token}`
	}
	const getCookie = () => {
		const cookie = document.cookie.split('; ')
		const token = cookie.find((v) => v.startsWith('token='))
		return token ? token.split('=')[1] : ''
	}
	const removeCookie = () => {
		document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
	}

	return {
		setCookie,
		getCookie,
		removeCookie,
	}
}
