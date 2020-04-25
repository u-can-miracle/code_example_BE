import { IPlanType } from '../../Appearance_planes/src/interfaces'

export interface ICharge {
  tokenId: string
  amount: number
  planCode: IPlanType
  paymentDate: Date
  paidMonthsCount: number
  currency: string
  companyId: number
  userPaidId: number
  planStartDate: Date
  planExpirationDate: Date
}

export interface ICreatedCharge extends ICharge {
  id: number
}

export interface IChargeUpdate {
  tokenId: string
  stripeChargeId: string
}
