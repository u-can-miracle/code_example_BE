import * as express from 'express'
import logger from '../config/logger'
import authRouter from './auth'
import categoriesRouter from './category'
import productsRouter from './product'
import userRouter from './user'
import companyRouter from './company'
import productImgRouter from './productImg'
import uploadRouter from './upload'
import planRouter from './plan'
import preloadState from './preloadState'
import { auth, validateUserStatus } from '../utils/middlwares'

const apiRouter = express.Router()

function getApiRouter(){
	apiRouter.use((req, res, next) => {
		logger.debug({ req, res })
		next()
	})

	apiRouter.use(authRouter)
	apiRouter.use(preloadState)

	apiRouter.use(auth)
	apiRouter.use(validateUserStatus)

  apiRouter.use(userRouter)
	apiRouter.use(categoriesRouter)
	apiRouter.use(productsRouter)
	apiRouter.use(productImgRouter)
	apiRouter.use(companyRouter)
	apiRouter.use(uploadRouter)
	apiRouter.use(planRouter)

	apiRouter.use((err, req, res, next) => {
		if(err.code){
			res.status(err.code)
			res.json(err)
		}
		res.status(500)
		res.end()
	})

	return apiRouter
}

export default getApiRouter
