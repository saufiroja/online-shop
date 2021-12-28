const router = require('express').Router();
const { updateUser, getUser } = require('../controllers/user.controllers');
const { authenticationToken } = require('../middlewares/jwt.service');

router.get('/account', authenticationToken, getUser);
router.put('/account', authenticationToken, updateUser);

module.exports = router;
