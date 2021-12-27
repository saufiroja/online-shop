const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    stripe_customer_id: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  },
  {
    sequelize,
    tableName: 'User',
    modelName: 'User',
    timestamps: true,
    paranoid: true,
  },
);

module.exports = { User };
