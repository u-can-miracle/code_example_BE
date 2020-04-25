import * as Joi from 'joi'

const companyCreate = {
	name: Joi.string().required(),
	country: Joi.string().required(),
	city: Joi.string().required(),
	address: Joi.string().optional().allow(null),
	email: Joi.string().email({ minDomainAtoms: 2 }).optional().allow(null),
	phone: Joi.string().optional().allow(null),
}

export const schemaCompanyCreate = Joi.object().keys({
	...companyCreate
})

export const schemaCompanyUpdate = Joi.object().keys({
	contactId: Joi.number().required(),
	...companyCreate
})

export const schemaCompanyInvite = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
})
