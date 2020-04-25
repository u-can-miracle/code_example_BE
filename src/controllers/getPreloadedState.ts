import logger from '../config/logger'
import { findOneUser, updateUsers } from '../db/models/user'
import { getCategories } from '../db/models/category'
import * as productModel from '../db/models/product'
import * as chargeModel from '../db/models/charge'
import { findCompanyInvitation } from '../db/models/companyInvitation'
import isUserLogged from '../utils/preload-state/isUserLogged'
import { decrypt } from '../utils/crypt'
import { parseCookies, TOKEN_NAME } from '../utils/cookies'
import { parseJwt } from '../utils/jwt'
import { cryptPassword } from '../utils/password'
import getUserOrCompanyQueryByPlan from '../utils/plans/getUserOrCompanyQueryByPlan'
import { formatProductsToWebApp } from '../utils/formatters'
import {
  getUserCompanyObj,
  getUserProfile,
  getFormattedPlanCharges,
} from '../utils/getters'
import { ICreatedCharge } from '../interfaces/charge'
// import { createToken } from '../utils/jwt'
// import { TOKEN_NAME, setCookies } from '../utils/cookies'

interface IParams {
	state: any
	headers: any
	hash?: string
	newPassword?: string
	url: string
	res: any
  hashedEmail?: string
}
export default async function getPreloadState(params: IParams){
	const {
		state,
		headers,
		hash,
		newPassword,
		url,
    hashedEmail,
		// res,
	} = params
	let categories = []
	let products = []
	let allProductsCount = 0

	if(hash || newPassword){
		const searchHash = hash || newPassword
		const user = await findOneUser({ hash: searchHash })

		if(user){
			const {
				email
			} = user
			let decryptedPwd
			let password
			let passwordObj

			if(newPassword){
				decryptedPwd = decrypt(newPassword)
				password = await cryptPassword(decryptedPwd)
				passwordObj = { password }
			}

			// update user
			await updateUsers({
				...passwordObj,
				isVerified: true,
				hash: null,
			}, { email })

			// TODO: not working cookies after reload page- cookies not set??
			// TODO: `setCookies` and `isLogged: true`
			// const token = createToken(user, headers['user-agent'])
			// setCookies(TOKEN_NAME, token, res)

			return {
				...state,
				user: {
					...state.user,
					profile: {
						...state.user.profile,
						...getUserProfile(user),
					},
					isLogged: false,
					isRegistationConfirmation: !!hash,
					isChangingPasswordProcess: !!newPassword,
					...getUserCompanyObj(user),
				},
				category: {
					...state.category,
				},
				product: {
					...state.product,
				},
        plan: {
          ...state.plan,
        }
			}
		}
	}

  if (hashedEmail) {
    // decode hash
    const invitedEmail = decrypt(hashedEmail)

    // get user
    const user = await findCompanyInvitation({ email: invitedEmail })

    if (user) {
      return {
        ...state,
        user: {
          ...state.user,
          registration: {
            email: user.email,
          },
        },
      }
    }
  }

	const { cookie, 'user-agent': userAgent } = headers
	const isLogged = await isUserLogged(cookie, userAgent)
	let profileObj = {}
	let companyObj = {}
  let paidPlans = []

	if(isLogged) {
		const parsedCookies = parseCookies(cookie)
		const jwt = parsedCookies[TOKEN_NAME]
		let decodedJwt

		try {
			decodedJwt = await parseJwt(jwt)
		} catch (err) {
			logger.error({ err })
		}

		if(decodedJwt) {
			const { user } = decodedJwt
			const planQuery = getUserOrCompanyQueryByPlan(user)

			categories = await getCategories(planQuery)

			if (url.includes('/products')) {
				const { prods, count } = await productModel.findAndCountAll(
					{
						...planQuery,
					},
					{ offset: 0, limit: 15 }
				)
				allProductsCount = count
				products = formatProductsToWebApp(prods)
			}

			// get user
			const foundedUser = await findOneUser({ id: user.id })

			// get profile and company
			profileObj = {
				profile: getUserProfile(foundedUser),
			}
			companyObj = getUserCompanyObj(foundedUser)

      // get last paid charges
      const lastCharges: ICreatedCharge[] = await chargeModel.getPlanCharges({
        companyId: user.companyId,
      })
      paidPlans = getFormattedPlanCharges(lastCharges)
		}
	}

	return {
		...state,
		user: {
			...state.user,
			isLogged,
			...profileObj,
			...companyObj,
		},
		category: {
			...state.category,
			categories,
		},
		product: {
			...state.product,
			products,
			allProductsCount,
		},
    plan: {
      ...state.plan,
      paidPlans,
    }
	}
}
