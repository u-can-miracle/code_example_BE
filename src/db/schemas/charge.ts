import { Model } from 'sequelize'
import sequelize from '../../config/db.connection'
import { fields } from './fields/charge'
import { IPlanType } from '../../../Appearance_planes/src/interfaces'

class ChargeSchema extends Model {
	public id: number
	public tokenId: string
	public stripeChargeId: string
  public amount: number
  public planCode: IPlanType
	public paymentDate: Date
  public paidMonthsCount: number
  public currency: string
  public companyId: number
  public userPaidId: number
  public planStartDate: Date
  public planExpirationDate: Date
}

ChargeSchema.init({
	...fields
}, {
	sequelize,
	modelName: 'charge',
	tableName: 'charge',
	timestamps: false,
	paranoid: false,
	underscored: false,
	freezeTableName: true,
})

export default ChargeSchema
