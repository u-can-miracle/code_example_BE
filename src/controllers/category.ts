import { pick } from 'lodash'
import sequelize from '../config/db.connection'
import logger from '../config/logger'
import {
	getCategories as getCategoriesModel,
	createCategory,
	findCategory,
	updateCategory,
	deleteCategory
} from '../db/models/category'
import * as productModel from '../db/models/product'
import buildNestedTree from '../utils/hierarchy/buildNestedTree'
import messages from '../constants/messages'
import getPlainCategory from '../utils/models/getPlainCategory'
import {
  hasPermission,
  CATEGORY_ENTITY,
  DELETE_PERMISSION,
} from '../..//Appearance_roles/src/roles'
import { IUser } from '../interfaces/user'
import getUserOrCompanyQueryByPlan from '../utils/plans/getUserOrCompanyQueryByPlan'

interface IFindNestedParams {
	companyId?: number | null
	userId?: number | null
	parentCategoryId?: number
}

export async function getCategoriesTreeByParams(params: IFindNestedParams) {
	const categories = await getCategoriesModel(params)
	const categoriesJson = categories.map(c => getPlainCategory(c))
	const sortedCategoriesTree = buildNestedTree(categoriesJson)

	return sortedCategoriesTree
}

interface IUpdate {
	name?: string
	priority?: number
	parentCategoryId?: number | null
}
interface IFields extends IUpdate {
	id?: number
}
interface IReturn {
	code: number
	data?: object
	message?: string
}

export async function getCategories(
  user: IUser,
  nestedSearch: string,
  parentCategoryId: string,
):Promise<IReturn>{
	// TODO: handle on client no categories
  const query = getUserOrCompanyQueryByPlan(user)
  const parentCategoryParams = parentCategoryId !== 'null' ? {
    parentCategoryId: Number(parentCategoryId),
  } : {}

	let data

  try {
    if (nestedSearch) {
      data = await getCategoriesTreeByParams({
        ...query,
        ...parentCategoryParams,
      })
    } else {
      data = await getCategoriesModel({
        ...query,
        ...parentCategoryParams,
      })
    }

    return {
      code: 200,
      data,
    }
  } catch (err) {
    logger.error({ err })

    return { code: 500 }
  }
}

export async function find(
  user: IUser,
  criteria: IFields,
):Promise<IReturn>{
  try {
    const query = getUserOrCompanyQueryByPlan(user, criteria)
    const category = await findCategory(query)

    if(!category){
      return {
        code: 404
      }
    }

    return {
      code: 200,
      data: category,
    }
  } catch (err) {
    logger.error({ err })

    return { code: 500 }
  }
}

export async function searchCategories(
  user: IUser,
  name: string,
){
  try {
    const query = getUserOrCompanyQueryByPlan(user)
    const categories = await getCategoriesModel({
      ...query,
      search: { name },
    })

    return {
      code: 200,
      data: categories,
    }
  } catch (err) {
    logger.error({ err })

    return { code: 500 }
  }
}

export async function create(
	user: IUser,
	name: string,
	priority?: number,
	parentCategoryId?: number,
):Promise<IReturn> {
  try {
    const query = getUserOrCompanyQueryByPlan(user)
    const categoryExists = await findCategory({ name, ...query })

    if(categoryExists){
      return {
        code: 400,
        data: {
          isCategoryExists: true
        }
      }
    }

    const { companyId, id } = user
    const category = await createCategory({
      name,
      priority,
      parentCategoryId,
      companyId,
      userId: id,
    })

    return {
      code: 200,
      data: pick(category, ['id', 'name', 'priority', 'parentCategoryId'])
    }
  } catch (err) {
    logger.error({ err })

    return { code: 500 }
  }
}

export async function update(
	user: IUser,
	where: IFields,
	updateParams: IUpdate,
	transaction?
):Promise<IReturn> {
	const { code } = await find(user, where)
	if(code !== 200){
		return { code }
	}

	if(where.id === updateParams.parentCategoryId){
		return {
			code: 400,
			message: messages.category.parentToItSelf,
		}
	}

  try {
    const [, [category]] = await updateCategory(where, updateParams, transaction)

    return {
      code: 200,
      data: category,
    }
  } catch (err) {
    logger.error({ err })

    return { code: 500 }
  }
}

export async function destroy(
	user: IUser,
	deleteParams: IFields,
):Promise<IReturn> {
  const options = {
    userRole: user.role,
    entityToCRUD: CATEGORY_ENTITY,
    permission: DELETE_PERMISSION,
  }
  const isAllowed = hasPermission(options)

  if (!isAllowed) {
    return { code: 403 }
  }

	const { code } = await find(user, deleteParams)
	if(code !== 200){
		return { code }
	}

  try {
    await sequelize.transaction(async t => {
  		// unassign child categories
  		await updateCategory(
  			{ parentCategoryId: deleteParams.id },
  			{ parentCategoryId: null },
  			t,
  		)

  		// unassign relative prods
  		await productModel.update({
  			categoryId: null
  		}, {
  			categoryId: deleteParams.id
  		}, t)

  		// remove category
  		await deleteCategory({
  			...deleteParams,
  		}, t)
  	})

  	return {
  		code: 200,
  		data: { id: deleteParams.id },
  	}
  } catch (err) {
    logger.error({ err })

    return { code: 500 }
  }
}
