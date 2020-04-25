import * as Joi from 'joi'
import { findAll as findAllUserType } from '../db/models/userType'

const typeSchema = Joi.string().valid('VENDOR', 'CUSTOMER')

type IUserType = 'VENDOR' | 'CUSTOMER'

interface IUserTypeObj {
	id: number
	type: IUserType
}

let userTypes: IUserTypeObj[]

export default async function getUserTypesIds(userType: IUserType): Promise<number>{
	const { error } = Joi.validate(userType, typeSchema/*, options*/)

	if(error){
		throw new Error(error.message)
	}

	if(!userTypes){
		userTypes = await findAllUserType()
	}

	return userTypes.find(({ type }) => type === userType).id
}
