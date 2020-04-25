export interface ICompanyContact {
	companyId: number
	country: string
	city: string
	address?: string
	email?: string
	phone?: string
}

export interface ICompanyContactCreated extends ICompanyContact {
	id: number
}
