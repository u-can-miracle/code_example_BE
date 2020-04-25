import * as crypto from 'crypto'
import * as bcrypt from 'bcrypt'

export function cryptPassword(password):Promise<string> {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) {
				return reject(err)
			}
			return resolve(hash)
		})
	})
}

export function createHash() {
	return crypto.randomBytes(16).toString('hex')
}

export function comparePassword(plainTextPassword, hash){
	// Load hash from your password DB.
	return bcrypt.compare(plainTextPassword, hash)
}
