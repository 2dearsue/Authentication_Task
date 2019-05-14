const { check } = require('express-validator/check');

const validateUser = [
  check('userName').not().isEmpty().trim().isLength({ min: 4, max: 35 }).escape(),
  check('password').not().isEmpty().trim().isLength({ min: 8, max: 20 }).escape()
]

module.exports = validateUser;
