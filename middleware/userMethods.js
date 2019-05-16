const userModel = require("../models/userModel");
const validateUser = require('../helpers/validateUser');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const jwt = require('jsonwebtoken');

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({errors: validationErrors.array()})
  }

  next();
}

const createUser = async (req, res, next) => {
  try {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);

      await userModel.create(req.body);
      res.status(201).json({message: `The user ${req.body.userName} was succesful created!`});

    } catch(error) {
      next(error);
    }
}

const updateHobbies = async(req, res, next) => {
  try {
    const decodedUser = await jwt.decode(req.token, process.env.SECRET);

    await findOneAndUpdate({userName: decodedUser.userName}, {$push: {hobbies: req.body.hobbies}})

    res.status(202).json({msg: 'You saved a new hobby.'});

  } catch(error) {
    next(error);
  }
}

const loginUser = async(req, res, next) => {
  try {
    const findUser = await userModel.findOne({userName: req.body.userName});

    if(!findUser) {
      return res.status(404).json({msg: 'User does not exist.'});
    }

    const passwordMatches = await bcrypt.compare(req.body.password, findUser.password);

    if(!passwordMatches) {
      return res.status(400).json({msg: 'Password invalid'});
    }

    const initialToken = await jwt.sign({userName: findUser.userName}, process.env.SECRET);
    // this is the stamp/payload/object
    const token = 'Bearer ' + initialToken;

    res.cookie('authToken', token, {httpOnly: true});

    res.status(200).json({userName: findUser.userName, hobbies: findUser.hobbies});

    } catch(error) {
      next(error);
    }
}

const logoutUser = async(req, res, next) => {
  try {

    res.clearCookie('authToken');

    res.status();

  } catch(error) {
    next(error);
  }
}

module.exports = {createUser, loginUser, handleValidationErrors, updateHobbies, logoutUser};

// boilerplate:

// const updateHobbies = async(req, res, next) => {
//   try {
//
//   } catch(error) {
//     next(error);
//   }
// }
