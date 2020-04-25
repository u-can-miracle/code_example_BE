import { Model } from 'sequelize'
import sequelize from '../../config/db.connection'
import { fields } from './fields/userType'

type IUserType = 'VENDOR' | 'CUSTOMER'
export interface IUserTypeObj {
	id: number
	type: IUserType
}
class UserTypeModel extends Model {
	public id: number
	public type: IUserType
}

UserTypeModel.init({
	...fields
}, {
	sequelize,
	modelName: 'userType',
	tableName: 'userType',
	timestamps: false,
	paranoid: false,
	underscored: false,
	freezeTableName: true,
})

export default UserTypeModel
