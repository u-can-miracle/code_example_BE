import { IProductImg } from './productImg'
import { ICategory } from './category'
import { IAsset } from './common'

interface IProductBase {
	id: number
	name: string
	description: string
	categoryId: number
	height: number,
	width: number,
	depth: number,
	companyId: number
	userId: number
	isActive: boolean
}

export interface IProduct extends IProductBase {
	modelIdOriginal: number
	modelIdConverted: number

	category: ICategory
	images: IProductImg[]
}

export interface IProductWeb extends IProductBase {
	images: IAsset[]
}

export interface IProductMobile extends IProductBase {
	categoryName: string
}

///  queries   ///
export interface IProductWhere {
	id?: number
	name?: string
	description?: string
	categoryId?: number
	companyId?: number
	userId?: number
	isActive?: boolean
  categoriesIds?: number[]
}

export interface IProductForNestedCategs {
	categoryId: string
	name: string
}
