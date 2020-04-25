import { Model } from 'sequelize'
import sequelize from '../../config/db.connection'
import { fields } from './fields/companyContacts'

class CompanyContactsSchema extends Model {
	public id: number
	public companyId: number
	public country: string
	public city: string
	public address: string
	public email: string
	public phone: string
}

CompanyContactsSchema.init({
	...fields
}, {
	sequelize,
	modelName: 'companyContacts',
	tableName: 'companyContacts',
	timestamps: false,
	paranoid: false,
	underscored: false,
	freezeTableName: true,
})

export default CompanyContactsSchema
