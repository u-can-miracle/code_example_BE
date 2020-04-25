import skipEmptyParams from '../skipEmptyParams'
import { IProductWhere } from '../../interfaces/product'
import { IUser } from '../../interfaces/user'

export default function getUserOrCompanyQueryByPlan(
  user: IUser,
	query: IProductWhere = {},
): IProductWhere {
  const { companyId, id: userId } = user
	const isCompanyModeEnabled = !!companyId
  const skipped = skipEmptyParams(query)

	if (isCompanyModeEnabled) {
    return { ...skipped, companyId }
	} else {
		return { ...skipped, userId }
	}
}
