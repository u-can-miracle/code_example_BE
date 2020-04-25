import { Model } from 'sequelize'
import sequelize from '../../config/db.connection'
import { fields } from './fields/productImg'
import ProductSchema from './product'

class ProductImgModel extends Model {
	public id: number
	public originalname: string
	public mimetype: string
	public location: string
	public key: string
	public productId: number

	// associations
	public readonly product?: ProductSchema
}

ProductImgModel.init({
	...fields
}, {
	sequelize,
	modelName: 'productImg',
	tableName: 'productImg',
	timestamps: true,
  paranoid: true,
	underscored: false,
	freezeTableName: true,
})

export default ProductImgModel
