import * as crypto from 'crypto'
import envs from '../config/envs'

export function encrypt(text: string):string{
	const cipher = crypto.createCipher(envs.encryptAlgorithm, envs.encryptPwd)
	let crypted = cipher.update(text,'utf8','hex')
	crypted += cipher.final('hex')
	return crypted
}

export function decrypt(text: string):string {
	const decipher = crypto.createDecipher(envs.encryptAlgorithm, envs.encryptPwd)
	let dec = decipher.update(text,'hex','utf8')
	dec += decipher.final('utf8')
	return dec
}

// const hw = encrypt('hello world')
// console.log(hw)
// console.log(decrypt(hw))
