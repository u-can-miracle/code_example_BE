const { DataTypes } = require('sequelize')

const ALL_ROLES = require('../constants/roles')

module.exports = {
  fields: {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: true,
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
    role: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        isIn: [Object.keys(ALL_ROLES)],
      },
    },
    phone: {
      type: DataTypes.STRING(25),
      defaultValue: '',
      allowNull: true,
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'userType',
        key: 'id',
      },
    },
    isVerified: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    hash: { // register or resetPwd hash
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
}
