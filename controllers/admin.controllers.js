const createError = require('http-errors');

const { Product } = require('../models');

// CREATE PRODUCT
exports.createProduct = async (req, res, next) => {
  try {
    // check user admin
    const { isAdmin } = req.user;
    if (!isAdmin || isAdmin === false) {
      throw new createError[401]('unauthorized');
    }

    // create product
    const { name, price, description } = req.body;
    const product = await Product.findOne({ where: { name } });
    if (product) {
      throw new createError(400, 'product already exists');
    }

    const products = await Product.create({
      name,
      price,
      description,
    });

    return res.status(201).json({
      message: 'successfully create product',
      code: 201,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res, next) => {
  try {
    // check user admin
    const { isAdmin } = req.user;
    if (!isAdmin || isAdmin === false) {
      throw new createError[401]('unauthorized');
    }

    // update product
    const { id } = req.params;
    const { name, price, description } = req.body;
    const product = await Product.update(
      { name, price, description },
      { where: { id } },
    );

    return res.status(200).json({
      message: 'successfully update product',
      code: 200,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res, next) => {
  try {
    // check user admin
    const { isAdmin } = req.user;
    if (!isAdmin || isAdmin === false) {
      throw new createError[401]('unauthorized');
    }

    // delete product
    const { id } = req.params;
    const product = await Product.destroy({ where: { id } });
    return res.status(200).json({
      message: 'successfully delete product',
      code: 200,
      product,
    });
  } catch (error) {
    next(error);
  }
};
