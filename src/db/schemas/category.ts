import { Model } from 'sequelize'
import sequelize from '../../config/db.connection'
import { fields } from './fields/category'
import CompanySchema from './company'
import ProductSchema from './product'

class CategorySchema extends Model {
	public id: number
	public name: string
	public priority: number
	public parentCategoryId: number
	public companyId: number
	public userId: number
	public isActive: boolean

	public readonly products: ProductSchema[]
}

CategorySchema.init({
	...fields
}, {
	sequelize,
	modelName: 'category',
	timestamps: false,
	paranoid: false,
	underscored: false,
	freezeTableName: true,
})

ProductSchema.belongsTo(CategorySchema, {
	foreignKey: 'categoryId',
	targetKey: 'id',
	as: 'category',
})

CategorySchema.belongsTo(CompanySchema, {
	foreignKey: 'companyId',
	targetKey: 'id',
	as: 'company',
})

CategorySchema.hasMany(ProductSchema, {
	foreignKey: 'categoryId',
	sourceKey: 'id',
	as: 'products',
})

export default CategorySchema
