import { Transaction } from 'sequelize'

import CompanyContactsSchema from '../schemas/companyContacts'
import skipEmptyParams from '../../utils/skipEmptyParams'
import { ICompanyContact } from '../../interfaces/companyContacts'

interface ICompanyContactCreate extends ICompanyContact {
	transaction?: Transaction
}
export async function createCompanyContact(params: ICompanyContactCreate) {
	const { transaction, ...other } = params
	const skipped = skipEmptyParams(other)

	const [company] = await CompanyContactsSchema.findOrCreate({
		transaction,
		where: {
			...skipped
		}
	})

	return company
}

export interface ICompanyContactFind {
	id?: number
	companyId?: number
	country?: string
	city?: string
	address?: string
	email?: string
	phone?: string
}
export async function findCompanyContacts(criteria: ICompanyContactFind) {
	const skipped = skipEmptyParams(criteria)

	const companiesContacts = await CompanyContactsSchema.findOne({
		where: skipped
	})

	return companiesContacts
}

interface IUpdate {
	country?: string
	city?: string
	address?: string
	email?: string
	phone?: string
}
interface IUpdateParams {
	update: IUpdate
	where: ICompanyContactFind
	transaction?: Transaction
}

export async function updateContact(params: IUpdateParams) {
	const { update, where, transaction } = params
	const skipped = skipEmptyParams(where)

	const result = await CompanyContactsSchema.update(update, {
		where: skipped,
		returning: true,
		transaction,
	})

	return result
}
