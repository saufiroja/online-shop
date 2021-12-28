const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(5, 3),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Product',
    modelName: 'Product',
    timestamps: true,
    paranoid: true,
  },
);

module.exports = { Product };
