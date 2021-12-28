const { User } = require('./User.model');
const { Product } = require('./Product.model');
const { Receipt } = require('./Receipt.model');

// USER
User.hasMany(Receipt, { foreignKey: 'userId' });

// RECEIPT
Receipt.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Product, Receipt };
