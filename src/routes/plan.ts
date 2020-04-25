import * as express from 'express'

import validator from '../utils/validator'
import { schemaPlanCharge } from '../utils/validator/schemas/plan'
import { chargePlan } from '../controllers/plan'
import handleResponse from '../utils/handleResponse'
import { IRequestWithIUser } from '../interfaces/user'

const planRouter = express.Router()


planRouter.post('/plan/charge',
  validator(schemaPlanCharge),
  async (req: IRequestWithIUser, res) => {
    const {
      user,
      body: {
        tokenId,
        planName,
        monthToBuy,
      },
    } = req

    const result = await chargePlan({
      tokenId,
      planName,
      monthToBuy,
      user,
    })

    handleResponse(res, result)
})

export default planRouter
