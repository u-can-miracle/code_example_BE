import { Transaction } from 'sequelize'

import UserSchema from '../schemas/user'
import CompanySchema from '../schemas/company'
import { contactsInclude } from './company'
import skipEmptyParams from '../../utils/skipEmptyParams'

import { IRoleNamesTypes } from '../../../Appearance_roles/src/interface'

interface IUserCreate {
	name: string,
	email: string,
	password: string,
	role: IRoleNamesTypes,
	userTypeId: number,
	transaction?: Transaction,
	companyId?: number,
	phone?: string,
	hash?: string,
}
export async function createUser (params: IUserCreate) {
	const {
		name,
		email,
		password,
		userTypeId,
		transaction,
		companyId,
    role,
		phone,
		hash,
	} = params
	const user = await UserSchema.create({
		name,
		email,
		password,
		userTypeId,
		companyId,
    role,
		phone,
		hash,
	}, {
		transaction,
	})

	return user
}

interface IFind {
	id?: number
	name?: string
	email?: string
	companyId?: number
  role?: IRoleNamesTypes,
	phone?: string
	userTypeId?: number
	isVerified?: boolean
	hash?: string
}
export async function findOneUser(criteria: IFind) {
  const skipped = skipEmptyParams(criteria)
  const user = await UserSchema.findOne({
  	where: skipped,
  	include: [
  		{
  			model: CompanySchema,
  			as: 'company',
  			include: [
  				contactsInclude,
  				{
  					model: UserSchema,
  					as: 'members',
  					attributes: [
  						'id',
  						'name',
  						'email',
  						'phone',
  						'role',
  						'isActive',
  					]
  				}
  			]
  		},
  	]
  })

  return user
}
export async function findUsers(criteria: IFind) {
  const skipped = skipEmptyParams(criteria)
  const users = await UserSchema.findAll({
  	where: skipped
  })

  return users
}
export async function findRegisteredUsers(criteria: IFind) {
  const skipped = skipEmptyParams(criteria)

  return findUsers({
  	isVerified: true,
  	...skipped
  })
}
interface IUpdater {
	name?: string
	email?: string
	password?: string
	companyId?: number
  role?: IRoleNamesTypes,
	isVerified?: boolean
	phone?: string
	hash?: string
}
export async function updateUsers(
	updater: IUpdater,
	where: IFind,
	t?: Transaction,
) {
  const skipped = skipEmptyParams(where)
  const result = await UserSchema.update(updater, {
  	where: skipped,
  	returning: true,
  	transaction: t,
  })

  return result
}

export async function deleteUser(id, t?: Transaction) {
  const count = await UserSchema.destroy(
    {
      where: { id },
      transaction: t,
    }
  )

  return count
}
