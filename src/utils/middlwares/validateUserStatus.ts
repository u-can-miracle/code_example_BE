import logger from '../../config/logger'

import handleResponse from '../handleResponse'
import { findOneUser } from '../../db/models/user'
import { IRequestWithIUser } from '../../interfaces/user'

export async function validateUserStatus(req: IRequestWithIUser, res, next) {
  try {
    const user = await findOneUser({ id: req.user.id })

    if (!user.isActive) {
      handleResponse(res, {
        code: 400,
        isAccountDisabled: true,
      })
    }
  } catch (err) {
    logger.error({ err })
    handleResponse(res, { code: 500 })
  }

  next()
}
