import { parseCookies, TOKEN_NAME } from '../cookies'
import { isUserAgentTheSame } from '../access'

async function isUserLogged(cookies, userAgent: string):Promise<boolean> {
	const parsedCookies = parseCookies(cookies)
	const jwt = parsedCookies[TOKEN_NAME]

	if(!jwt){
		return false
	}

	const isAgentSame = await isUserAgentTheSame(userAgent, jwt)

	return isAgentSame
}

export default isUserLogged
