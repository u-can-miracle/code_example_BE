import * as express from 'express'

import validator from '../utils/validator'
import {
	schemaRegistration,
	schemaLogin,
	schemaResetPwd,
} from '../utils/validator/schemas/user'
import {
	userRegistration,
	userLogin,
	userLogout,
	resetPassword,
} from '../controllers/user'
import handleResponse from '../utils/handleResponse'

const authRouter = express.Router()

authRouter.post('/registration', validator(schemaRegistration), async (req, res, next) => {
	const result = await userRegistration(req.body)

	handleResponse(res, result)
})

authRouter.post('/login', validator(schemaLogin), async (req, res, next) => {
	const result = await userLogin(req.body, req.headers['user-agent'], res)

	handleResponse(res, result)
})

authRouter.post('/logout', async (req, res, next) => {
	const result = await userLogout(req, res)

	handleResponse(res, result)
})

authRouter.post('/reset-password', validator(schemaResetPwd), async (req, res) => {
	const { body: { email, newPassword } } = req
	const result = await resetPassword(email, newPassword)

	handleResponse(res, result)
})

export default authRouter
