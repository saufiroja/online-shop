require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticationToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const result = await jwt.verify(token, JWT_SECRET);
      req.user = result;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'unauthorized',
        code: 401,
        error,
      });
    }
  } else {
    return res.status(401).json({
      message: 'Authentication error. Token required',
      code: 401,
    });
  }
};

module.exports = { authenticationToken };
