import { getJwt } from '../jwt'
import logger from '../../config/logger'
import handleResponse from '../handleResponse'

export async function auth(req, res, next) {
	let decodedJwt
	try {
		decodedJwt = await getJwt(req)

		if(decodedJwt){
			req.user = decodedJwt.user
			next()
		} else {
			handleResponse(res, { code: 401 })
		}
	} catch (err) {
    logger.error({ err })
		handleResponse(res, { code: 500 })
	}
}
