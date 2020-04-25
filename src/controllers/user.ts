import sequelize from '../config/db.connection'
import {
	createUser,
	findOneUser,
	findUsers,
	updateUsers,
  deleteUser as deleteUserModal,
} from '../db/models/user'
import { getCategories } from '../db/models/category'
import { createCompany } from '../db/models/company'
import { createCompanyContact } from '../db/models/companyContacts'
import {
  findCompanyInvitation,
  removeCompanyInvitation,
 } from '../db/models/companyInvitation'
 import * as chargeModel from '../db/models/charge'
import getUserTypesIds from '../utils/getUserTypesIds'
import {
	cryptPassword,
	comparePassword,
	createHash,
} from '../utils/password'
import { createToken } from '../utils/jwt'
import { encrypt } from '../utils/crypt'
import {
	TOKEN_NAME,
	setCookies,
	clearCookies,
} from '../utils/cookies'
import * as mailer from '../utils/external-services/mailer'
import logger from '../config/logger'
import getUserOrCompanyQueryByPlan from '../utils/plans/getUserOrCompanyQueryByPlan'
import skipEmptyParams from '../utils/skipEmptyParams'
import { getFormattedPlanCharges } from '../utils/getters'
import { getUserCompanyObj, getUserProfile } from '../utils/getters'
import { ICategory } from '../interfaces/category'
import { IProfile, IUser } from '../interfaces/user'
import {
  ALL_ROLES,
  hasPermission,
  USER_ENTITY,
  ASSIGN_ROLE_PERMISSION,
  UPDATE_PERMISSION,
  DELETE_PERMISSION,
} from '../..//Appearance_roles/src/roles'

type IUserType = 'VENDOR' | 'CUSTOMER'
interface IRegUser {
	username: string
	email: string
	password: string
	userType: IUserType
	companyName?: string
	country?: string
	city?: string
}
interface IReturn {
	code: number
	data?: object
	message?: string
}
export async function userRegistration (userData: IRegUser):Promise<IReturn> {
	return sequelize.transaction(async t => {
		const {
			username,
			email,
			password,
			userType,
			companyName,
			country,
			city,
		} = userData

		let userTypeId
		let hashedPassword
		let users
		let companyObj = {}

		try {
			userTypeId = await getUserTypesIds(userType)
			hashedPassword = await cryptPassword(password)
			users = await findUsers({ email })
		} catch (err) {
			logger.error({ err })

      return { code: 500 }
		}

		const isEmailExists = !!users.length

		if(isEmailExists){
			return {
				code: 400,
				data: {
					isEmailExists,
				}
			}
		}

		try {
      const invitedUser = await findCompanyInvitation({ email })
      const role = invitedUser ? ALL_ROLES.MEMBER : ALL_ROLES.ADMIN

      const hash = createHash()

			if(userData.companyName) {
				const company = await createCompany({
					name: companyName,
					transaction: t,
				})

				await createCompanyContact({
					companyId: company.id,
					country,
					city,
					transaction: t,
				})

				companyObj = { companyId: company.id }
			}

			await createUser({
				name: username,
				email,
				password: hashedPassword,
				userTypeId,
				transaction: t,
				hash,
        role,
        companyId: invitedUser && invitedUser.companyId,
				...companyObj,
			})

      if (invitedUser) {
        await removeCompanyInvitation({ email }, t)
      }

      await mailer.registrationConfirm(email, hash)

      return { code: 200 }
		} catch (err) {
			logger.error({ err })

      return { code: 500 }
		}
	})
}

interface ILoginData {
	isUserExists: boolean
	isNotVerified?: boolean
	isPassEqual?: boolean
	isDisabled?: boolean

	// TODO: implement response
	// categories: string[],
	// products: string[],
	profile?: object
	categories?: ICategory[]
}
interface ILoginReturn {
	code: number
	data?: ILoginData
}
export async function userLogin (
	params,
	userAgent: string,
	res
):Promise<ILoginReturn> {
  try {
    const {
  		email,
  		password
  	} = params
  	const user = await findOneUser({ email })
  	const isUserExists = !!user

  	if (!isUserExists) {
  		return {
  			code: 400,
  			data: {
  				isUserExists: false,
  			}
  		}
  	}

  	if (!user.isVerified) {
  		return {
  			code: 400,
  			data: {
  				isUserExists: true,
  				isNotVerified: true,
  			}
  		}
  	}

    if (!user.isActive) {
      return {
        code: 400,
        data: {
          isUserExists: true,
          isDisabled: true,
        }
      }
    }

  	const isPassEqual = await comparePassword(password, user.password)

  	if(isPassEqual){
  		const token = createToken(user, userAgent)
  		setCookies(TOKEN_NAME, token, res)

  		res.set(TOKEN_NAME, token)

  		const planQuery = getUserOrCompanyQueryByPlan(user)
  		const categories = await getCategories(planQuery)

      const lastCharges = await chargeModel.getPlanCharges({
        companyId: user.companyId,
      })
      const formattedCharges = getFormattedPlanCharges(lastCharges)

      return {
  			code: 200,
  			data: {
  				isUserExists: true,
  				isPassEqual: true,
  				isNotVerified: false,
  				profile: getUserProfile(user),
  				categories,
  				...getUserCompanyObj(user),
          paidPlans: formattedCharges,
  			}
  		}
  	} else {
  		return {
  			code: 400,
  			data: {
  				isUserExists: true,
  				isNotVerified: false,
  				isPassEqual: false,
  			}
  		}
  	}
  } catch (err) {
    logger.error({ err })

    return { code: 500 }
  }
}

export async function resetPassword(
	email: string,
	newPassword: string
):Promise<IReturn>  {
	try {
    // checn if user eists
  	const user = await findOneUser({ email })

  	if(!user){
  		return {
  			data: {
  				isUserExist: false,
  			},
  			code: 404,
  		}
  	}

		const cryptedPwd = encrypt(newPassword)

		await mailer.changePassword(email, cryptedPwd)

		// save pwd to user
		await updateUsers({
			isVerified: true,
			hash: cryptedPwd,
		}, { email })

  	return { code: 200 }
	} catch (err) {
		return {
			code: 500,
			message: err.message
		}
	}
}

export async function userLogout(req, res) {
	let isOk = false

	try {
		await clearCookies(req, res)
		isOk = true
	} catch (err) {
		logger.error({ err })
	}

	return {
		code: isOk ? 200 : 500
	}
}


export async function updateProfile(profile: IProfile, user: IUser) {
  try {
    const { id } = profile
    const skipped = skipEmptyParams(profile)
    const keys = Object.keys(skipped)

    const fundedUser = await findOneUser({ id })

    if (keys.length === 2 && keys.includes('role') && keys.includes('id')) {
      const optionsUpdateRole = {
        userRole: user.role,
        entityToCRUD: USER_ENTITY,
        permission: ASSIGN_ROLE_PERMISSION,
        userToUpdate: fundedUser,
      }

      const isAllowed = hasPermission(optionsUpdateRole)
      const inSameCompany = user.companyId === fundedUser.companyId

      if (!isAllowed || !inSameCompany) {
        return {
          code: 403,
          data: { isAllowed: false }
        }
      }
    } else {
      const optionsUpdate = {
        userRole: user.role,
        entityToCRUD: USER_ENTITY,
        permission: UPDATE_PERMISSION,
        userToUpdate: fundedUser,
      }
      const isUpdateAllowd = hasPermission(optionsUpdate)
      const isUpdateSelf = user.id === id

      if (!isUpdateSelf && !isUpdateAllowd) {
        return {
          code: 403,
          data: { isAllowed: false }
        }
      }
    }

    const [, [updatedUser]] = await updateUsers(skipped, { id })

    return {
      code: 200,
      data: updatedUser,
    }
  } catch (err) {
    logger.error({ err })
    return {
      code: 500,
      message: err.message
    }
  }
}

export async function deleteUser(userId: number, currentUser: IUser) {
  try {
    const fundedUser = await findOneUser({ id: userId })
    const options = {
      userRole: currentUser.role,
      entityToCRUD: USER_ENTITY,
      permission: DELETE_PERMISSION,
      userToUpdate: fundedUser,
    }
    const isAllowd = hasPermission(options)

    if (!isAllowd) {
      return {
        code: 403,
        data: { isAllowed: false }
      }
    }

    const result = await deleteUserModal(userId)

    return {
      code: 200,
      data: { count: result },
    }
  } catch (err) {
    logger.error({ err })
    return {
      code: 500,
      message: err.message
    }
  }
}
