const { DataTypes } = require('sequelize')

module.exports = {
  fields: {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    warning: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    error: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
  },
}
