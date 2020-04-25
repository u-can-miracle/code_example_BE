export default function skipEmptyParams<T>(obj:T): T{
	const keys = Object.keys(obj)

	for (let i = 0; i < keys.length; i++){
		const key = keys[i]
		const value = obj[key]

		if ([undefined, null, '', NaN].includes(value)){
      delete obj[key]
		}
	}

	return obj
}
