export function shouldBeOneOf(item, array) {
	if (!array.includes(item)) {
		throw new Error(`item should be one of array element instead of ${item}`)
	}
}
