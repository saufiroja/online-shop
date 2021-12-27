const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { JWT_SECRET } = process.env;

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check user
    const isExists = await User.findOne({ where: { email } });
    if (isExists) {
      throw new createError[400]('user already exists');
    }

    // hash Password
    const hashPassword = await bcrypt.hash(password, 12);

    // create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      isAdmin: false,
    });

    return res.status(201).json({
      message: 'successfully register user',
      code: 201,
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      throw new createError.BadRequest('invalid email');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new createError.BadRequest('invalid password');
    }
    const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 });
    return res.status(200).json({
      message: 'successfully login user',
      code: 200,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
