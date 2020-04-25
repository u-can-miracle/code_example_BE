import * as express from 'express'

import { IRequestWithIUser } from '../interfaces/user'
import validator from '../utils/validator'
import {
	schemaProfile,
} from '../utils/validator/schemas/user'
import {
  updateProfile,
  deleteUser,
} from '../controllers/user'
import handleResponse from '../utils/handleResponse'

const userRouter = express.Router()

userRouter.put('/profile', validator(schemaProfile), async (req: IRequestWithIUser, res) => {
	const { body: { name, email, phone, id, role, isActive }, user } = req
	const result = await updateProfile({
    name,
    email,
    phone,
    id,
    role,
    isActive,
  }, user)

	handleResponse(res, result)
})

userRouter.delete('/user/:id', async (req: IRequestWithIUser, res) => {
	const { params: { id }, user } = req
	const result = await deleteUser(Number(id), user)

	handleResponse(res, result)
})

export default userRouter
