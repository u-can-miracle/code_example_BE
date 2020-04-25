export interface IReturn {
	code: number
	data?: object
	message?: string
}

export interface IPaginationParams {
	offset: number
	limit: number
}

export interface IAsset {
	originalname: string
	mimetype: string
	location: string
	key: string
}

export interface ILiveSearch {
  name?: string
}
