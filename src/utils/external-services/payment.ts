import Stripe from 'stripe'

import envs from '../../config/envs'

const stripe = new Stripe(envs.stripe.secKey, {
  apiVersion: '2020-03-02',
})

interface IChargeParams {
  amountInCentes: number
  planName: string
  monthToBuy: number
  userId: number
  tokenId: string
}

export async function proceedCharge(params: IChargeParams) {
  const {
    amountInCentes,
    planName,
    monthToBuy,
    userId,
    tokenId,
  } = params

  // https://stripe.com/docs/api/charges/object
  const charge: Stripe.Charge = await stripe.charges.create({
    amount: amountInCentes,
    currency: 'usd',
    description: `Buy ${planName} plan for ${monthToBuy} month by userId ${userId}`,
    source: tokenId,
  })

  return charge
}
