const createError = require('http-errors');
const { Product, Receipt, Review } = require('../models');

// GET ALL PRODUCT
exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({
      message: 'successfully get all product',
      code: 200,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE PRODUCT
exports.getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getProductInfo = await Product.findOne({ where: { id } });
    const getProductReview = await Review.findAll({
      include: { model: Product },
      where: { productId: getProductInfo.dataValues.id },
    });

    const result = await Promise.all([getProductInfo, getProductReview]);

    const product = result[0];
    const reviews = result[1];

    const productWithReview = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      reviews,
    };

    // check user if loggen-in
    const userId = req.user.id;
    if (!req.user && userId) {
      throw new createError[400]('unauthorized');
    }

    const receipts = await Receipt.findAll({
      where: { userId, productId: product.id },
    });

    if (receipts[0] && receipts[1].req.user.id) {
      throw new createError[500](`Couldn't verify that you purchased it.`);
    }

    const productWithReviewPurchased = Object.assign(productWithReview, {
      purchased: true,
      userId,
    });

    return res.status(200).json({
      message: 'success get singgle product',
      code: 200,
      productWithReview,
      productWithReviewPurchased,
    });
  } catch (error) {
    next(error);
  }
};
