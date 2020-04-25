import * as cookie from 'cookie'

export const TOKEN_NAME = 'jwToken'

export function parseCookies(cookies){
	if(!cookies){
		return {}
	}

	return cookie.parse(cookies)
}

export function setCookies(key: string, value: string, res){
	const week = 1000 * 60 * 60 * 24 * 7

	// res.cookie('jwToken', token, {
	res.cookie(key, value, {
		maxAge: week, httpOnly: false, signed: false
	})
}

export async function clearCookies(req, res) {
	res.clearCookie(TOKEN_NAME)
}
