import { Model } from 'sequelize'
import sequelize from '../../config/db.connection'
import { fields } from './fields/company'
import companyContactsSchema from './companyContacts'
import UserSchema from './user'

class CompanySchema extends Model {
	public id: number
	public name: string
	public planExpirationDate: Date

	public contacts: companyContactsSchema[]
}

CompanySchema.init({
	...fields
}, {
	sequelize,
	modelName: 'company',
	tableName: 'company',
	timestamps: false,
	paranoid: false,
	underscored: false,
	freezeTableName: true,
})

CompanySchema.hasMany(companyContactsSchema, {
	foreignKey: 'companyId',
	sourceKey: 'id',
	as: 'contacts',
})

CompanySchema.hasMany(UserSchema, {
	foreignKey: 'companyId',
	sourceKey: 'id',
	as: 'members',
})

UserSchema.belongsTo(CompanySchema, {
	foreignKey: 'companyId',
	targetKey: 'id',
	as: 'company'
})

export default CompanySchema
