const router = require('express').Router();

const { authenticationToken } = require('../middlewares/jwt.service');
const {
  getAllProduct,
  getSingleProduct,
} = require('../controllers/product.controllers');

router.get('/products', authenticationToken, getAllProduct);
router.get('/product/:id', authenticationToken, getSingleProduct);

module.exports = router;
