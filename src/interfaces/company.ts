import { ICompanyContact } from './companyContacts'

export interface ICompany {
	id: number
	name: string
}

export interface ICompanyAssociated extends ICompany {
	id: number
	name: string
	contacts: ICompanyContact[]
}

export interface ICreateCompanyWithContact extends ICompany, ICompanyContact {}

export interface ICreatedCompanyWithContact extends ICreateCompanyWithContact{
	id: number
	contactId: number
}

export interface ICompanyInvitation {
	email: string
	companyId: number
}
export interface ICompanyInvitationCreated extends ICompanyInvitation {
	id: number
}
