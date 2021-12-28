const router = require('express').Router();
const { register, login } = require('../controllers/auth.controllers');
const {
  loginSchema,
  registerSchema,
} = require('../middlewares/joi/auth.validator');
const { validate } = require('../middlewares/joi/joi.validator');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;
