import { get } from 'lodash'

import { IPlanCharge } from '../../../Appearance_planes/src/interfaces'
import { IUser, IProfile } from '../../interfaces/user'
import { ICompanyContactCreated } from '../../interfaces/companyContacts'
import { ICreatedCharge } from '../../interfaces/charge'

const formatContacts = (contacts: ICompanyContactCreated[] = []) => contacts.map(
	c => ({
		contactId: c.id,
		country: c.country,
		city: c.city,
		address: c.address,
		email: c.email,
		phone: c.phone,
	})
)

export function getUserProfile(user: IUser): IProfile {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		phone: user.phone,
		role: user.role,
		isActive: user.isActive,
	}
}

export function getUserCompanyObj(
  user: IUser,
) {
	return {
		company: {
			companyId: get(user, 'company.id', ''),
			companyName: get(user, 'company.name', ''),
			contacts: formatContacts(get(user, 'company.contacts', [])),
			members: get(user, 'company.members', [])
        .filter(u => u.id !== user.id)
        .map(getUserProfile)
		}
	}
}

export function getFormattedPlanCharges(charges: ICreatedCharge[]): IPlanCharge[] {
  const formatted = charges.map((charge: ICreatedCharge) => ({
    id: charge.id,
    paidPlanCode: charge.planCode,
    planStartDate: charge.planStartDate,
    planExpirationDate: charge.planExpirationDate,
  }))

  return formatted
}
