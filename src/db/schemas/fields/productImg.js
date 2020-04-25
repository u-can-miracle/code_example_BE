const { DataTypes, DATE, literal } = require('sequelize')

module.exports = {
  fields: {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    originalname: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    key: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP'),
      type: DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP'),
      type: DATE,
    },
    deletedAt: DATE,
  },
}
