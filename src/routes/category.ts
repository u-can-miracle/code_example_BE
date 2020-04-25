import * as express from 'express'
import {
	find as findCategory,
	create as createCategory,
	update as updateCategory,
	destroy as destroyCategory,
	getCategories,
  searchCategories,
} from '../controllers/category'
import validator from '../utils/validator'
import {
  schemaFindCategory,
	schemaCreateCategory,
	schemaUpdateCategory,
  schemaSearchCategory,
} from '../utils/validator/schemas/category'
import handleResponse from '../utils/handleResponse'
import { IRequestWithIUser } from '../interfaces/user'

const categoriesRouter = express.Router()
const routerUrl = 'category'

categoriesRouter.get(`/${routerUrl}`,
	validator(schemaFindCategory, 'query'),
	async (req: IRequestWithIUser, res) => {
    const { nestedSearch, parentCategoryId } = req.query
		const result = await getCategories(req.user, nestedSearch, parentCategoryId)

		handleResponse(res, result)
	}
)

categoriesRouter.get(`/${routerUrl}/search`,
	validator(schemaSearchCategory, 'query'),
	async (req: IRequestWithIUser, res) => {
    const { name } = req.query
		const result = await searchCategories(req.user, name)

		handleResponse(res, result)
	}
)

categoriesRouter.get(`/${routerUrl}/:id`, async (req: IRequestWithIUser, res) => {
	const { params: { id } } = req
	const result = await findCategory(req.user, { id: +id })

	handleResponse(res, result)
})

categoriesRouter.post(`/${routerUrl}`, validator(schemaCreateCategory),
	async (req: IRequestWithIUser, res) => {
		const { body: { name, priority, parentCategoryId } } = req
		const result = await createCategory(req.user, name, priority, parentCategoryId)

		handleResponse(res, result)
})

categoriesRouter.put(`/${routerUrl}/:id`,
  validator(schemaUpdateCategory),
  async (req: IRequestWithIUser, res) => {
  	const { body, params: { id } } = req
  	const result = await updateCategory(req.user, { id: +id }, body)

  	handleResponse(res, result)
})

categoriesRouter.delete(`/${routerUrl}/:id`, async (req: IRequestWithIUser, res) => {
	const { params: { id } } = req
	const result = await destroyCategory(req.user, { id: +id })

	handleResponse(res, result)
})

export default categoriesRouter
