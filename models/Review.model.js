const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./sequelize');

class Review extends Model {}

Review.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Review',
    modelName: 'Review',
    timestamps: true,
    paranoid: true,
  },
);

module.exports = { Review };
