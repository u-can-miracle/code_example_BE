export function matching <T>(
	entityArray1: T[],
	entityArray2: T[],
	matchCriteria: boolean = true,
	matchKey1: string,
	matchKey2?: string,
): T[] {
	if(!matchKey2) matchKey2 = matchKey1

	const founded = entityArray1.filter(
		ent1 => !!entityArray2.find(
			ent2 => {
				const isMatched = ent1[matchKey1] === ent2[matchKey2]

				return isMatched
			}
		) === matchCriteria
	)

	return founded
}

export function getMatched <T>(
	entityArray1: T[],
	entityArray2: T[],
	matchKey1: string,
	matchKey2?: string,
): T[] {
	return matching(
		entityArray1,
		entityArray2,
		true,
		matchKey1,
		matchKey2,
	)
}

export function getNotMatched <T>(
	entityArray1: T[],
	entityArray2: T[],
	matchKey1: string,
	matchKey2?: string,
): T[] {
	return matching(
		entityArray1,
		entityArray2,
		false,
		matchKey1,
		matchKey2,
	)
}
