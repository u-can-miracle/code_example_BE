import { Request } from 'express'

import { IRoleNamesTypes } from '../../Appearance_roles/src/interface'
import { ICompanyAssociated } from './company'

export interface IProfile {
  id: number
  name: string
  email: string
  phone: string
  role: IRoleNamesTypes
  isActive: boolean
}

export interface IUser extends IProfile {
	password: string
	companyId: number
	userTypeId: number
	isVerified: boolean
	hash: string
	company: ICompanyAssociated
}

export interface IRequestWithIUser extends Request {
	user: IUser
}
