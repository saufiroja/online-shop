const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class ProductCategory extends Model {}

ProductCategory.init(
  {},
  {
    sequelize,
    tableName: 'ProductCategory',
    modelName: 'ProductCategory',
    timestamps: true,
    paranoid: true,
  },
);

module.exports = { ProductCategory };
