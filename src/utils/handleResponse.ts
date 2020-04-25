interface IResult {
	code: number
	data?: object
	message?: string
	isDataExhausted?: boolean
	isAccountDisabled?: boolean
	count?: number
}

export default function handleResponse(
	res,
	result: IResult,
){
	const {
		data = {},
		code,
		message,
		isDataExhausted,
		count,
    isAccountDisabled = false,
	} = result
	const exhaustedParams = isDataExhausted !== undefined ? { isDataExhausted, count } : {}

	// if(code > 400){
	// 	res.status(code)
	// }

	// if(code === 400){
	if(code >= 400){
		res.json({
			isOk: false,
			message,
      data,
      isAccountDisabled,
			...exhaustedParams,
		})
	} else {
		res.json({
			isOk: true,
			data,
			message,
			...exhaustedParams,
		})
	}
}
