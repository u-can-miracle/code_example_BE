import * as Joi from 'joi'

import { PLANES_NAMES } from '../../../../Appearance_planes/src/constants'

const {
  PERSONAL,
  COMPANIES,
} = PLANES_NAMES

const planCharge = {
  tokenId: Joi.string().required(),
	planName: Joi.string().valid([
    PERSONAL,
    COMPANIES.SMALL,
    COMPANIES.MEDIUM,
    COMPANIES.ADVANCED,
    COMPANIES.CORPORATE,
  ]).required(),
	monthToBuy: Joi.number().required(),
}

export const schemaPlanCharge = Joi.object().keys({
	...planCharge
})
