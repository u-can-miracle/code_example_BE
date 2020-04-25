import { Transaction } from 'sequelize'

import ChargeSchema from '../schemas/charge'
import { ICharge } from '../../interfaces/charge'

interface IGetParams {
  companyId: number
  offset?: number
  limit?: number
  transaction?: Transaction
}
export async function getPlanCharges(params: IGetParams) {
  const { companyId, offset, limit, transaction } = params
  const isPagination = limit || offset
  const paginationParams = isPagination ? { limit, offset } : {}

  const result = ChargeSchema.findAll({
    ...paginationParams,
    where: {
      companyId,
    },
    order: [['planExpirationDate', 'DESC']],
    transaction,
  })

  return result
}

interface ICreate extends ICharge {
  transaction?: Transaction
}
export async function createCharge(params: ICreate) {
  const {
    tokenId,
    amount,
    planCode,
    paymentDate,
    paidMonthsCount,
    currency,
    companyId,
    userPaidId,
    transaction,
    planStartDate,
    planExpirationDate,
  } = params
  const company = await ChargeSchema.create({
      tokenId,
      amount,
      planCode,
      paymentDate,
      paidMonthsCount,
      currency,
      companyId,
      userPaidId,
      planStartDate,
      planExpirationDate,
    }, {
      transaction,
  })

  return company
}

interface IUpdate {
  update: { stripeChargeId: string }
  where: {
    tokenId: string
  }
  transaction?: Transaction
}
export async function updateCharge(params: IUpdate) {
  const {
    update: { stripeChargeId },
    where: { tokenId },
    transaction,
  } = params
  const result = await ChargeSchema.update({
		stripeChargeId,
	}, {
		transaction,
		where: { tokenId },
		returning: true,
	})

	return result
}
