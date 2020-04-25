import { parseJwt } from './jwt'

export async function isUserAgentTheSame(userAgent: string, token: string):Promise<boolean> {
	const jwToken = await parseJwt(token)

	return jwToken.userAgent === userAgent
}
