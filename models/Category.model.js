const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Category',
    modelName: 'Category',
    timestamps: true,
    paranoid: true,
  },
);

module.exports = { Category };
