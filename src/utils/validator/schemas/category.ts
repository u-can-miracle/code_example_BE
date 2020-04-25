import * as Joi from 'joi'

const baseSchema = {
	id: Joi.number().optional(),
	name: Joi.string().optional(),
	priority: Joi.number().optional(),
}

const categorySchema = Joi.object().keys({
	...baseSchema,
	parentCategoryId: Joi.number().optional(),
})

export const schemaFindCategory = Joi.object().keys({
	nestedSearch: Joi.string().optional(),
	parentCategoryId: Joi.string().optional(),
})

export const schemaCreateCategory = categorySchema

export const schemaUpdateCategory = Joi.object().keys({
	...baseSchema,
	parentCategoryId: Joi.number().optional().allow(null),
})

export const schemaSearchCategory = Joi.object().keys({
	name: Joi.string().allow(null).allow(''),
})
