import { ICategory } from '../../interfaces/category'

export default function getPlainCategory(category: ICategory): ICategory{
	return {
		id: category.id,
		name: category.name,
		priority: category.priority,
		parentCategoryId: category.parentCategoryId,
		companyId: category.companyId,
		userId: category.userId,
		isActive: category.isActive,
		products: category.products,
	}
}
