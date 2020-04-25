import * as Joi from 'joi'

export const assetSchemaKeys = {
	originalname: Joi.string().required(),
	mimetype: Joi.string().required(),
	location: Joi.string().required(),
	key: Joi.string().required(),
}

const assetSchema = Joi.object({
  // fields
})

export const schemaCreateProduct = Joi.object().keys({
	name: Joi.string().required(),
	description: Joi.string().required(),
	categoryId: Joi.number().optional(),
	height: Joi.number().optional(),
	width: Joi.number().optional(),
	depth: Joi.number().optional(),
	images: Joi.array().items(
		assetSchema
	),
})

export const schemaUpdateProduct = schemaCreateProduct

export const schemaGetProductsForNestedCategories = Joi.object().keys({
	categoryId: Joi.string(),
	name: Joi.string().allow(null).allow(''),
	limit: Joi.string().optional(),
	offset: Joi.string().optional(),
})
