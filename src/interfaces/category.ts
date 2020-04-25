import { IProduct } from './product'

export interface ICategory {
	id: number
	name: string
	priority: number
	parentCategoryId: number
	companyId: number
	userId: number
	isActive: boolean
	products: IProduct[]
}
