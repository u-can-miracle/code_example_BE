import * as jwt from 'jsonwebtoken'

import envs from '../config/envs'
import { IUser } from '../interfaces/user'

export function createToken(user: IUser, userAgent: string){
	const payload = {
		user,
		userAgent
	}
	const token = jwt.sign(payload, envs.secretToken, {
		expiresIn: '7d'
	})

	return token
}

interface IParsedJwt {
	user: IUser
	userAgent: string
}
export function parseJwt(jwToken):Promise<IParsedJwt>{
	return new Promise((resolve, reject) => {
		jwt.verify(jwToken, envs.secretToken, (err, decoded) => {
			if(err){
				reject(err)
			} else {
				try {
					const {
						user: {
							// tslint:disable-next-line
							id, name, email, companyId, userTypeId, role
						},
						// tslint:disable-next-line
						userAgent,
					} = decoded
					resolve(decoded)
				} catch (error) {
					reject(error)
				}
			}
		})
	})
}

interface IJwtObj {
	user: IUser
	userAgent: string
}
export function getJwt(req):Promise<IJwtObj> {
		const { cookies: { jwToken } } = req

		if(!jwToken){
			// user is not logged
			return Promise.resolve(null)
		} else {
			return parseJwt(jwToken)
		}
}
