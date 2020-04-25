import { Transaction } from 'sequelize'

import CompanySchema from '../schemas/company'
import CompanyContactsSchema from '../schemas/companyContacts'
import skipEmptyParams from '../../utils/skipEmptyParams'

export const contactsInclude = {
	model: CompanyContactsSchema,
	as: 'contacts',
	attributes: [
		'id',
		'country',
		'city',
		'address',
		'email',
		'phone',
	],
}

interface ICompanyCreate {
	name: string
	transaction?: Transaction
}
export async function createCompany(params: ICompanyCreate) {
	const {
		name,
		transaction
	} = params

  // TODO: one company in many cities
	const company = await CompanySchema.create({
			name,
		}, {
			transaction,
	})

	return company
}

interface IFind {
	id?: number
	name?: string
}
export async function findCompany(criteria: IFind) {
  const skipped = skipEmptyParams(criteria)
	const companies = await CompanySchema.findAll({
		where: skipped,
		include: [contactsInclude],
	},
)

	return companies
}

interface IUpdate {
	name?: string
  planExpirationDate?: Date
}
interface IWhere {
	id?: number
	name?: string
}
interface IUpdateParams {
	update: IUpdate
	where: IWhere
	transaction?: Transaction
}
export async function updateCompany(params: IUpdateParams){
	const { update, where, transaction } = params
  const skipped = skipEmptyParams(where)
	const result = await CompanySchema.update(update, {
		where: skipped,
		returning: true,
		transaction,
	})

	return result
}
