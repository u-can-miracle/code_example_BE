import { Model } from 'sequelize'
import sequelize from '../../config/db.connection'
import { fields } from './fields/user'
import UserTypeSchema from './userType'
import CompanySchema from './company'
import { IRoleNamesTypes } from '../../../Appearance_roles/src/interface'

class UserSchema extends Model {
	public id: number
	public name: string
	public email: string
	public password: string
	public role: IRoleNamesTypes
	public companyId: number
	public phone: string
	public userTypeId: number
	public isVerified: boolean
	public isActive: boolean
	public hash: string

	public company: CompanySchema
}

UserSchema.init({
	...fields
}, {
	sequelize,
	modelName: 'user',
	tableName: 'user',
	timestamps: false,
	paranoid: false,
	underscored: false,
	freezeTableName: true,
})

UserTypeSchema.hasOne(UserSchema, {
	as: 'userType',
	foreignKey: 'userTypeId'
})

export default UserSchema
