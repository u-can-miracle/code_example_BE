import { Op } from 'sequelize'

import skipEmptyParams from '../utils/skipEmptyParams'
import { ILiveSearch } from '../interfaces/common'

export function prepearIlikeParams(obj: ILiveSearch) {
  if (!obj) {
    return {}
  }

  const skipped = skipEmptyParams(obj)
  const keys = Object.keys(skipped)

  if (!keys.length) {
    return {}
  }

  return keys.reduce((acc, key) => ({
    ...acc,
    [key]: { [Op.iLike]: `%${obj[key]}%`, }
  }), {})
}


export function prepearInParams(obj) {
  const skipped = skipEmptyParams(obj)
  const keys = Object.keys(skipped)

  if (!keys.length) {
    return {}
  }

  return keys.reduce((acc, key) => ({
    ...acc,
    [key]: { [Op.in]: obj[key], }
  }), {})
}
