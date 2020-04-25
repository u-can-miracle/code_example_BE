import * as Joi from 'joi'
import { CUSTOMER, VENDOR } from '../../../constants/user'
import { ALL_ROLES } from '../../../../Appearance_roles/src/roles'

const defaultUser = {
	username: Joi.string().alphanum().min(2).max(30).required(),
	email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
	userType: Joi.string().valid([CUSTOMER, VENDOR]).required(),
}

const userWithCompany = {
	...defaultUser,
	companyName: Joi.string().required(),
	country: Joi.string().required(),
	city: Joi.string().required(),
}

const schemaRegUser = Joi.object().keys({
	...defaultUser,
})
const schemaRegUserWithCompany = Joi.object().keys({
	...userWithCompany,
})

export const schemaRegistration = Joi.alternatives().try(
	schemaRegUser,
	schemaRegUserWithCompany,
)

export const schemaLogin = Joi.object().keys({
	email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
})

export const schemaResetPwd = Joi.object().keys({
	email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	newPassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
})

export const schemaProfile = Joi.object().keys({
	id: Joi.number().required(),
	name: Joi.string().alphanum().min(2).max(30).optional(),
	email: Joi.string().email({ minDomainAtoms: 2 }).optional(),
	phone: Joi.string().optional().allow([null, '']),
  role: Joi.string().valid(Object.values(ALL_ROLES)).optional(),
  isActive: Joi.boolean().optional(),
})
