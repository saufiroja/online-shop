const createError = require('http-errors');

const { User } = require('../models');

// GET USER
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new createError[401]('unauthorized');
    }
    return res.status(200).json({
      message: 'successfully get user',
      code: 200,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE USER
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { email, firstName, lastName } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new createError[401]('unauthorized');
    }
    const update = await User.update(
      { email, firstName, lastName },
      { where: { id } },
    );
    return res.status(201).json({
      message: 'successfully update user',
      code: 201,
      data: update,
    });
  } catch (error) {
    next(error);
  }
};
