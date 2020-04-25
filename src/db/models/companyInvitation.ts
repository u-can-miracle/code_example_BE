import { Transaction } from 'sequelize'

import CompanyInvitationSchema from '../schemas/companyInvitation'
import skipEmptyParams from '../../utils/skipEmptyParams'
import { ICompanyInvitation } from '../../interfaces/company'

interface IFind {
	id?: number
	email?: string
}
export async function findCompanyInvitation(params: IFind) {
  const skipped = skipEmptyParams(params)
  const result = await CompanyInvitationSchema.findOne({ where: skipped })

  return result
}

export async function createCompanyInvitation(
	payload: ICompanyInvitation,
	transaction?: Transaction,
) {
	const invitation = await CompanyInvitationSchema.create(
		payload,
		{ transaction }
	)

	return invitation
}

export async function removeCompanyInvitation (
	findParams: IFind,
	transaction?: Transaction,
): Promise<number> {
	const skipped = skipEmptyParams(findParams)
	const count = await CompanyInvitationSchema.destroy(
		{
			where: skipped,
			transaction,
		}
	)

	return count
}
