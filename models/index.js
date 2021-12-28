const { User } = require('./User.model');
const { Product } = require('./Product.model');
const { Receipt } = require('./Receipt.model');
const { Review } = require('./Review.model');

// USER
User.hasMany(Receipt, { foreignKey: 'userId' });
User.hasMany(Review, { foreignKey: 'userId' });

// RECEIPT
Receipt.belongsTo(User, { foreignKey: 'userId' });

// REVIEW
Review.belongsTo(Product, { foreignKey: 'productId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// PRODUCT
Product.hasMany(Review, { foreignKey: 'productId' });

module.exports = { User, Product, Receipt, Review };
