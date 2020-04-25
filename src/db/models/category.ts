import { Transaction } from 'sequelize'
import CategorySchema from '../schemas/category'
import ProductSchema from '../schemas/product'
import { prodInclude } from './product'
import skipEmptyParams from '../../utils/skipEmptyParams'
import { prepearIlikeParams } from '../utils'
import { ILiveSearch } from '../../interfaces/common'

interface ICategoriesParams {
	id?: number | null
	companyId?: number | null
	userId?: number | null
	parentCategoryId?: number
  search?: ILiveSearch
}
export async function getCategories(
	findParams: ICategoriesParams,
	withInclude: boolean = false,
){
  const { search, ...other } = findParams
	const prodIncludeParams = withInclude  ? { include: prodInclude } : {}
  const skipped = skipEmptyParams(other)
  const iLikeParams = prepearIlikeParams(search)
  const categories = await CategorySchema.findAll({
		where: {
      ...iLikeParams,
      ...skipped,
    },
		include: [{
			model: ProductSchema,
			as: 'products',
			...prodIncludeParams,
		}],
	})

	return categories
}

interface ICreateCateg {
	name: string,
	companyId?: number
	userId: number
	priority?: number
	parentCategoryId?: number
}
export async function createCategory (params: ICreateCateg) {
	const {
		name,
		priority,
		parentCategoryId,
		companyId,
		userId,
	} = params
	const category = await CategorySchema.create({
		name,
		priority,
		parentCategoryId,
		companyId,
		userId,
	})

	return category
}

interface IUpdate {
	name?: string
	companyId?: number
	userId?: number
	priority?: number
	parentCategoryId?: number | null,
}
interface IAllFields extends IUpdate {
	id?: number
}

export async function findCategory(
	criteria: IAllFields,
	include: boolean = false,
	prodIncludeEnabled: boolean = false,
) {
	const prodIncludeParams = prodIncludeEnabled ? {
		include: prodInclude,
	} : {}
	const includeParams = include ? {
		include: [{
			model: ProductSchema,
			as: 'products',
			...prodIncludeParams,
		}]
	} : {}
  const skipped = skipEmptyParams(criteria)
	const category = await CategorySchema.findOne({
		where: skipped,
		...includeParams,
	})

	return category
}

export async function updateCategory(
	where: IAllFields,
	updateParams: IUpdate,
	transaction?: Transaction,
) {
  const skipped = skipEmptyParams(where)
	const result = await CategorySchema.update({
		...updateParams
	}, {
		transaction,
		where: skipped,
		returning: true,
	})

	return result
}

export async function deleteCategory(
	deleteParams: IAllFields,
	transaction: Transaction
) {
  const skipped = skipEmptyParams(deleteParams)
	const categories = await CategorySchema.destroy({
		where: skipped,
		transaction,
	})

	return categories
}
