import * as Joi from 'joi'

import { assetSchemaKeys } from './product'

export const schemaCreateProductImg = Joi.object().keys({
	...assetSchemaKeys,
	productId: Joi.number().required(),
})

export const schemaUpdateProductImg = Joi.object().keys({
	location: Joi.string().optional(),
	key: Joi.string().optional(),
	originalname: Joi.string().optional(),
	mimetype: Joi.string().optional(),
	productId: Joi.number().optional(),
})
