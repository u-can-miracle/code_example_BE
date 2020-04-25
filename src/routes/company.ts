import * as express from 'express'

import { IRequestWithIUser } from '../interfaces/user'
import { ICreatedCompanyWithContact } from '../interfaces/company'
import validator from '../utils/validator'
import {
	schemaCompanyCreate,
	schemaCompanyUpdate,
  schemaCompanyInvite,
} from '../utils/validator/schemas/company'
import {
	companyCreate,
	companyUpdate,
  companyInvite,
} from '../controllers/company'
import handleResponse from '../utils/handleResponse'

const companyRouter = express.Router()

companyRouter.post('/company', validator(schemaCompanyCreate), async (req: IRequestWithIUser, res) => {
	const result = await companyCreate(req.body, req.user)

	handleResponse(res, result)
})

companyRouter.put('/company/:id', validator(schemaCompanyUpdate), async (req: IRequestWithIUser, res) => {
	const { params: { id }, body, user } = req
	const updateParams: ICreatedCompanyWithContact = { id: +id, ...body }
	const result = await companyUpdate(updateParams, user)

	handleResponse(res, result)
})

companyRouter.post('/company/invite', validator(schemaCompanyInvite), async (req: IRequestWithIUser, res) => {
  const { body: { email } } = req
  const result = await companyInvite({ email }, req.user)

  handleResponse(res, result)
})

export default companyRouter
