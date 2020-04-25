import { Model } from 'sequelize'
import sequelize from '../../config/db.connection'
import { fields } from './fields/companyInvitation'

class CompanyInvitationSchema extends Model {
	public id: number
	public companyId: number
	public email: string
}

CompanyInvitationSchema.init({
	...fields
}, {
	sequelize,
	modelName: 'companyInvitation',
	tableName: 'companyInvitation',
	timestamps: false,
	paranoid: false,
	underscored: false,
	freezeTableName: true,
})

export default CompanyInvitationSchema
