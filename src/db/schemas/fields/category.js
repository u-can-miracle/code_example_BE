const { DataTypes } = require('sequelize')

module.exports = {
  fields: {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      unique: true,
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 50,
    },
    parentCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: -1,
      references: {
        model: 'category',
        key: 'id',
      },
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'company',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    isActive: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
}
