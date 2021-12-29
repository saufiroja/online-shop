const { User } = require('./User.model');
const { Product } = require('./Product.model');
const { Receipt } = require('./Receipt.model');
const { Review } = require('./Review.model');
const { Category } = require('./Category.model');
const { ProductCategory } = require('./ProductCategory.model');

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
Product.hasMany(ProductCategory, { foreignKey: 'productId' });
Product.belongsToMany(Category, { through: ProductCategory });

// CATEGORY
Category.hasMany(ProductCategory);
Category.belongsToMany(Product, { through: ProductCategory });

// PRODUCT CATEGORY
ProductCategory.belongsTo(Product, { foreignKey: 'productId' });
ProductCategory.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = { User, Product, Receipt, Review, Category };
