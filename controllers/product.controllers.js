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

    if (!productWithReviewPurchased) {
      throw new createError[400](`Could not get the product infomation`);
    }

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

// GET SINGLE PRODUCT PURCHASED PRODUCT INFO
exports.getSinglePurchasedProductInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user.id;

    const receipt = await Receipt.findAll({
      where: { productId: id, userId: user },
    });

    if (receipt.length > 0) {
      throw new createError[403]('No purcahsed product!');
    }

    if (!receipt) {
      throw new createError[400]('Could not retrieve receipts');
    }

    return res.status(200).json({
      message: 'success get single product with purchased',
      code: 200,
      data: receipt,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE REVIEW
exports.createReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user.id;
    const { body, rating } = req.body;

    const reviews = await Review.findAll({
      where: { productId: id, userId: user },
    });

    if (reviews && reviews[0]) {
      throw new createError[403]('Already wrote a review before');
    }

    const result = await Review.create({
      userId: user,
      productId: id,
      body,
      rating: parseInt(rating, 10),
    });

    if (!result) {
      throw new createError[400]('Could not save your review.');
    }

    return res.status(201).json({
      message: 'successfully submit review',
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user.id;

    const review = await Review.destroy({
      where: { productId: id, userId: user },
    });

    if (!review) {
      throw new createError[400]('Could not delete your review');
    }

    return res.status(200).json({
      message: 'successfully delete review',
      code: 200,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};
