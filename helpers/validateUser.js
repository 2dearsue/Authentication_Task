const { check } = require('express-validator/check');
const userModel = require('../models/userModel')

const validateUser = [
  check('userName')
    .exists().withMessage('The username field is madatory.')
    .trim()
    .isLength({ min: 4, max: 35 }).withMessage('The user should be between 4 and 35 characters.')
    .escape(),

  check('password')
    .exists().withMessage('The password field is mandatory')
    .trim()
    .isLength({ min: 8, max: 20 }).withMessage('The user should be between 8 and 20 characters.')
    .escape(),

  check('userName').custom(async userNameProvided => {
    const user = await userModel.findOne({userName: userNameProvided});

    if(user) {
      throw new Error('User with that given username already exists.')
    }
  })
]

const validateHobbyRequest = [
  check('hobbies')
  .exists().withMessage('please put a hobby')
  .trim()
  .escape()
];

module.exports = {validateUser, validateHobbyRequest};
