const router = require('express').Router();

const { authenticationToken } = require('../middlewares/jwt.service');
const { getReceipts } = require('../controllers/receipt.controllers');

router.get('/receipt', authenticationToken, getReceipts);

module.exports = router;
