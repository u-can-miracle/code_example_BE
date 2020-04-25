interface ICategory {
	id: number
	name: string
	priority?: number
	parentCategoryId?: number
	children?: any
}

export default function buildNestedTree(categoriesList: ICategory[]): ICategory[] {
	const roots = categoriesList.filter(c => !c.parentCategoryId)
	const children = categoriesList.filter(c => c.parentCategoryId)

	const childrenTree = getNestedChildren(roots, children)

	for(let i = 0; i < roots.length; i++){
		if(childrenTree[i].length){
			roots[i].children = childrenTree[i]
		}
	}

	return roots
}

function getNestedChildren(parents, items: ICategory[]){
	const children = []

	for(let parentIndex = 0; parentIndex < parents.length; parentIndex++){
		const parent = parents[parentIndex]
		children[parentIndex] = []

		for(let i = 0; i < items.length; i++){
			const item = items[i]
			if(item.parentCategoryId === parent.id){
				items.splice(i, 1)
				i--
				children[parentIndex].push(item)
			}
		}
	}

	for(let parentIndex = 0; parentIndex < parents.length; parentIndex++){
		const subChildren = children[parentIndex]

		// get children for parent
		if(subChildren.length && items.length){
			const childrenOfParentsChildren = getNestedChildren(subChildren, items)
			for(let i = 0; i < subChildren.length; i++){
				if(childrenOfParentsChildren[i].length){
					subChildren[i].children = childrenOfParentsChildren[i]
				}
			}
		}
	}

	return children
}
