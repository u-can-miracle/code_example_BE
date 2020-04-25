import sequelize from '../config/db.connection'
import logger from '../config/logger'
import { createCompany, updateCompany } from '../db/models/company'
import { createCompanyContact, updateContact } from '../db/models/companyContacts'
import {
  findOneUser,
  updateUsers,
} from '../db/models/user'
import {
  findCompanyInvitation,
  createCompanyInvitation,
} from '../db/models/companyInvitation'
import { encrypt } from '../utils/crypt'
import {
  inviteMemberToCompany,
  inviteExistedMemberToCompany,
 } from '../utils/external-services/mailer'
import {
  hasPermission,
  USER_ENTITY,
  INVITE_PERMISSION,
} from '../..//Appearance_roles/src/roles'
import {
	ICreateCompanyWithContact,
	ICreatedCompanyWithContact,
} from '../interfaces/company'
import { IUser } from '../interfaces/user'

export function companyCreate(
	companyParams: ICreateCompanyWithContact,
	user: IUser,
) {
	const {
		name,
		...contacts
	} = companyParams

	return sequelize.transaction(async t => {
		try {
			const company = await createCompany({
				name,
				transaction: t,
			})

			const contact = await createCompanyContact({
				companyId: company.id,
				...contacts,
				transaction: t,
			})

			await updateUsers(
				{	companyId: company.id	},
				{ id: user.id },
				t,
			)

			return {
				code: 200,
				data: {
					companyId: company.id,
					...companyParams,
					contactId: contact.id,
				},
			}
		} catch (err) {
      t.rollback()
			logger.error({ err })
			return {
				code: 500,
				message: err.message
			}
		}
	})
}

export async function companyUpdate(
	params: ICreatedCompanyWithContact,
	user: IUser,
) {
	// validate user company id
	if(user.companyId !== params.id) return { code: 403 }

	const { id, name, country, city, address, email, phone, contactId } = params

	return sequelize.transaction(async t => {
		try {
  		// update company name
  		const [, [updatedComp]] = await updateCompany({
  			update: { name },
  			where: { id },
  			transaction: t,
  		})

			// update company contact
  		const [, [updatedContact]] = await updateContact({
  			update: { country, city, address, email, phone },
  			where: { id: contactId, companyId: id },
  			transaction: t,
  		})

				return {
					code: 200,
					data: {
						companyId: id,
						contactId,
						name: updatedComp.name,
						country: updatedContact.country,
						city: updatedContact.city,
						address: updatedContact.address,
						email: updatedContact.email,
						phone: updatedContact.phone
					},
				}
		} catch (err) {
			logger.error({ err })
			return {
				code: 500,
				message: err.message
			}
		}
	})
}

interface IInviteParams {
  email: string
}
export async function companyInvite(params: IInviteParams, user: IUser) {
  const options = {
    userRole: user.role,
    entityToCRUD: USER_ENTITY,
    permission: INVITE_PERMISSION,
  }

  const isAllowed = hasPermission(options)

  if (!isAllowed) {
    return {
      code: 403,
      data: { isAllowed: false }
    }
  }

  const { email } = params
  const { companyId } = user

  try {
    // update existing user if exist
    const existedUser = await findOneUser({ email })
    if (existedUser) {
      await updateUsers({ companyId }, { email })

      // send email
      await inviteExistedMemberToCompany(email)

      return {
        code: 200,
        data: {
          isExistedUserAlreadyInvited: true,
          isAlreadyInvited: false,
        },
      }
    }

    const existingInvitations = await findCompanyInvitation({ email })

    if(existingInvitations){
      return {
        code: 200,
        data: {
          isExistedUserAlreadyInvited: false,
          isAlreadyInvited: true,
        },
      }
    }

    // create invitation
    await createCompanyInvitation({
      email,
      companyId,
    })

    // send email to user
    const hashedEmail = encrypt(email)
    await inviteMemberToCompany(email, hashedEmail)


    // send response
    return {
      code: 200,
      data: {
        isExistedUserAlreadyInvited: false,
        isAlreadyInvited: false,
      },
    }
  } catch (err) {
    logger.error({ err })
    return {
      code: 500,
      message: err.message
    }
  }
}
