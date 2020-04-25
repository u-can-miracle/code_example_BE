const { DataTypes } = require('sequelize')

module.exports = {
  fields: {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    tokenId: {
      type: DataTypes.STRING(55),
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    stripeChargeId: {
      type: DataTypes.STRING(55),
      unique: false,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    planCode: {
      type: DataTypes.STRING(55),
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    paidMonthsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(5),
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userPaidId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    planStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    planExpirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
}
