const router = require('express').Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/admin.controllers');
const { authenticationToken } = require('../middlewares/jwt.service');
const { validate } = require('../middlewares/joi/joi.validator');
const { productSchema } = require('../middlewares/joi/product.validator');

router.post(
  '/product',
  authenticationToken,
  validate(productSchema),
  createProduct,
);

router.put(
  '/product/:id',
  authenticationToken,
  validate(productSchema),
  updateProduct,
);

router.delete('/product/:id', authenticationToken, deleteProduct);

module.exports = router;
