import * as express from 'express'
import validator from '../utils/validator'
import {
	schemaCreateProductImg,
	schemaUpdateProductImg
} from '../utils/validator/schemas/productImg'
import handleResponse from '../utils/handleResponse'
import {
	getProductImg,
	createProductImg,
	updateProductImg,
	deleteProductImg,
} from '../controllers/productImg'
import { IRequestWithIUser } from '../interfaces/user'

const productImgRouter = express.Router()
const routerUrl = 'product-img'

productImgRouter.get(`/${routerUrl}/:id`, async (req: IRequestWithIUser, res) => {
	const { params: { id } } = req
	const result = await getProductImg(req.user, +id)

	handleResponse(res, result)
})

productImgRouter.post(`/${routerUrl}`,
  validator(schemaCreateProductImg),
  async (req: IRequestWithIUser, res) => {
  	const {
  		body: {
  			location,
  			key,
  			productId,
  			originalname,
  			mimetype,
  		}
  	} = req
  	const result = await createProductImg(req.user, {
  		location,
  		key,
  		productId,
  		originalname,
  		mimetype,
  	})

  	handleResponse(res, result)
})

productImgRouter.put(`/${routerUrl}/:id`,
  validator(schemaUpdateProductImg),
  async (req: IRequestWithIUser, res) => {
  	const { params: { id } } = req
  	const { body: {
  			originalname,
  			mimetype,
  			location,
  			key,
  			productId,
  		}
  	} = req
  	const result = await updateProductImg(
  		req.user,
  		{
  			originalname,
  			mimetype,
  			location,
  			key,
  			productId,
  		},
  		+id,
  	)

  	handleResponse(res, result)
})

productImgRouter.delete(`/${routerUrl}/:id`, async (req: IRequestWithIUser, res) => {
	const { params: { id } } = req
	const result = await deleteProductImg(req.user, +id)

	handleResponse(res, result)
})

export default productImgRouter
