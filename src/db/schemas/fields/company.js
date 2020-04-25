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
      type: DataTypes.STRING(55),
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // planExpirationDate: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: true,
    // },
  },
}
