const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./sequelize');

class Receipt extends Model {}

Receipt.init(
  {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stripe_charge_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stripe_customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Receipt',
    modelName: 'Receipt',
    timestamps: true,
    paranoid: true,
  },
);

module.exports = { Receipt };
