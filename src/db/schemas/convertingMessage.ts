import { Model } from 'sequelize'
import sequelize from '../../config/db.connection'
import { fields } from './fields/convertingMessage'

class ConvertingMessageSchema extends Model {
	public id: number
	public warning: string
	public error: string
}

ConvertingMessageSchema.init({
	...fields
}, {
	sequelize,
	modelName: 'convertingMessage',
	tableName: 'convertingMessage',
	timestamps: false,
	paranoid: false,
	underscored: false,
	freezeTableName: true,
})

export default ConvertingMessageSchema
