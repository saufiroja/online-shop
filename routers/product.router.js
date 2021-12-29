const router = require('express').Router();

const { authenticationToken } = require('../middlewares/jwt.service');
const {
  getAllProduct,
  getSingleProduct,
  createReview,
  getSinglePurchasedProductInfo,
} = require('../controllers/product.controllers');

router.get('/products', authenticationToken, getAllProduct);
router.get('/product/:id', authenticationToken, getSingleProduct);
router.get(
  '/:id/purchased',
  authenticationToken,
  getSinglePurchasedProductInfo,
);

router.post('/:id/reviews', authenticationToken, createReview);

module.exports = router;
