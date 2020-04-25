import { Transaction } from 'sequelize'
import ProductImgSchema from '../schemas/productImg'
import ProductSchema from '../schemas/product'
import skipEmptyParams from '../../utils/skipEmptyParams'
import { IAsset } from '../../interfaces/common'

export async function get(id: number) {
	const productImg = await ProductImgSchema.findByPk(id, {
		include: [{
			model: ProductSchema,
			as: 'product'
		}]
	})

	return productImg
}

export interface IAssetOptional {
	originalname?: string
	mimetype?: string
	location?: string
	key?: string
}
interface ICreate extends IAsset {
	productId: number
}
export async function create(params: ICreate) {
	const productImg = await ProductImgSchema.create(params)

	return productImg
}

export async function bulkCreate(records: ICreate[], transaction?: Transaction) {
	const productImg = await ProductImgSchema.bulkCreate(records, { transaction })

	return productImg
}

interface IUpdate extends IAssetOptional {
	productId?: number
}
interface IWhere {
	id?: number
	productId?: number
}
export async function update(
	params: IUpdate,
	where: IWhere,
	transaction?: Transaction,
) {
  const skipped = skipEmptyParams(where)
	const result = await ProductImgSchema.update(params, {
		where: skipped,
		returning: true,
		transaction,
	})

	return result
}

export async function remove(id: number) {
	const count = await ProductImgSchema.destroy({
		where: { id },
	})

	return count
}
