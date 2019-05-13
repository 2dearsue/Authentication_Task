const { check, validationResult } = require('express-validator/check');

check('userName').not().isEmpty().trim(),
check('password').not().isEmpty().trim().isLength({ min: 5, max: 20 });

module.exports = validateUser;
