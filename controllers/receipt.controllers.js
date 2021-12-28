const createError = require('http-errors');

const { Receipt } = require('../models');

exports.getReceipts = async (req, res, next) => {
  try {
    const { id } = req.user;
    const receipt = await Receipt.findAll({ where: { id } });
    if (receipt.length === 0) {
      throw new createError[400]('no receipts');
    }

    return res.status(200).json({
      message: 'success get receipt',
      code: 200,
      receipt,
    });
  } catch (error) {
    next(error);
  }
};
