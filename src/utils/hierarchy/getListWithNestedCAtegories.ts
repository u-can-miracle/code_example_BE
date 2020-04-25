import { ICategory } from '../../interfaces/category'

export default function getListWithNestedCategories(
	parent: ICategory,
	allCategories: ICategory[],
):ICategory[] {
	const allNested = getNestedCategories(parent, allCategories)
	const listWithNestedCategories = [...allNested, parent]

	return listWithNestedCategories
}

function getNestedCategories(
	parent: ICategory,
	allCategories: ICategory[],
): ICategory[] {
	const all = []
	const childCategories = getChildCategories(parent, allCategories)

	for(const category of childCategories) {
		const nested = getNestedCategories(category, allCategories)

		all.push(category, ...nested)
	}

	return all
}

function getChildCategories(
	parent: ICategory,
	allCategories: ICategory[],
) {
	const nestedCategories = []

	for(const category of allCategories) {
		if(category.parentCategoryId === parent.id) {
			nestedCategories.push(category)
		}
	}

	return nestedCategories
}
