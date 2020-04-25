import * as moment from 'moment'

import sequelize from '../../config/db.connection'
import logger from '../../config/logger'
import * as chargeModel from '../../db/models/charge'
import { proceedCharge } from '../../utils/external-services/payment'
import { getFormattedPlanCharges } from '../../utils/getters'

import { getPlanByName } from '../../../Appearance_planes/src/utils'
import { IPlanType } from '../../../Appearance_planes/src/interfaces'
import { IReturn } from '../../interfaces/common'
import { IUser } from '../../interfaces/user'

interface IChargeParams {
  tokenId: string
  planName: IPlanType
  monthToBuy: number
  user: IUser
}
export async function chargePlan(params: IChargeParams):Promise<IReturn> {
  const {
    tokenId,
    planName,
    monthToBuy,
    user: {
      id: userId,
      companyId,
    },
  } = params
  const foundPlan = getPlanByName(planName)
  const amount = foundPlan.price * monthToBuy
  const currency = 'usd'
  const now = moment()
  const paymentDate: Date = new Date(now.toISOString())

  let planExpirationDate: Date
  let planStartDate: Date

  const latestCharge = await chargeModel.getPlanCharges({ companyId, limit: 1 })

  if (!latestCharge.length) {
    // 1st charge - apply plan from current day
    planStartDate = new Date(now.startOf('day').toISOString())
  } else {
    const lastExpDate = moment(latestCharge[0].planExpirationDate)
    // apply plan after latest plan
    planStartDate = new Date(lastExpDate.add(1, 'days').startOf('day').toISOString())
  }

  planExpirationDate = new Date(
    moment(planStartDate)
      .add(monthToBuy, 'M')
      .endOf('day')
      .toISOString()
    )

  try {
    return sequelize.transaction(async t => {
        await chargeModel.createCharge({
          tokenId,
          amount,
          planCode: foundPlan.code,
          paidMonthsCount: monthToBuy,
          userPaidId: userId,
          currency,
          companyId,
          paymentDate,
          planStartDate,
          planExpirationDate,
          transaction: t,
        })

        const lastCharges = await chargeModel.getPlanCharges({
          companyId,
          transaction: t,
        })
        const charge = await proceedCharge({
          amountInCentes: amount * 100,
          planName,
          monthToBuy,
          userId,
          tokenId,
        })

        // updateCharge
        chargeModel.updateCharge({
          update: { stripeChargeId: charge.id },
          where: { tokenId },
        })

        const formattedCharges = getFormattedPlanCharges(lastCharges)

        return {
          code: 200,
          data: formattedCharges,
        }
    })
  } catch (err) {
    logger.error({ err })
    return {
      code: 400,
      message: err.message,
    }
  }
}
