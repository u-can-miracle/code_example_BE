import buildNestedTree from '../../../src/utils/hierarchy/buildNestedTree'

describe('buildNestedTree', () => {
	const categoryList = [
		{
			id: 1,
			name: 'Root 1',
			parentCategoryId: null,
		},
		{
			id: 2,
			name: 'Root 2',
			parentCategoryId: null,
		},
		{
			id: 3,
			name: 'category 1.1',
			parentCategoryId: 1
		},
		{
			id: 4,
			name: 'category 1.2',
			parentCategoryId: 1
		},
		{
			id: 5,
			name: 'category 1.1.1',
			parentCategoryId: 3
		},
		{
			id: 6,
			name: 'category 1.1.2',
			parentCategoryId: 3
		},
		{
			id: 7,
			name: 'category 1.2.1',
			parentCategoryId: 4
		},
		{
			id: 8,
			name: 'category 2.1',
			parentCategoryId: 2
		},
		{
			id: 9,
			name: 'category 2.2',
			parentCategoryId: 2
		},
		{
			id: 10,
			name: 'category 2.1.1',
			parentCategoryId: 8
		}
	]

	const expectedTree = [
		{
			id: 1,
			name: 'Root 1',
			parentCategoryId: null,
			children: [
				{
					id: 3,
					name: 'category 1.1',
					parentCategoryId: 1,
					children: [
						{
							id: 5,
							name: 'category 1.1.1',
							parentCategoryId: 3
						},
						{
							id: 6,
							name: 'category 1.1.2',
							parentCategoryId: 3
						},
					]
				},
				{
					id: 4,
					name: 'category 1.2',
					parentCategoryId: 1,
					children: [
						{
							id: 7,
							name: 'category 1.2.1',
							parentCategoryId: 4
						},
					]
				},
			]
		},
		{
			id: 2,
			name: 'Root 2',
			parentCategoryId: null,
			children: [
				{
					id: 8,
					name: 'category 2.1',
					parentCategoryId: 2,
					children: [
						{
							id: 10,
							name: 'category 2.1.1',
							parentCategoryId: 8
						}
					]
				},
				{
					id: 9,
					name: 'category 2.2',
					parentCategoryId: 2
				},
			]
		},
	]

	test('should return nested tree', () => {
		const tree = buildNestedTree(categoryList)
		expect(tree).toEqual(expectedTree)
	})
})
