const userModel = require("../models/userModel");

const createUser = async (req, res, next) => {
  try {
    const user = await userModel.create(req.body)
    res.status(201).json({message: `The user ${req.body.userName} was succesful created!`})
  } catch(error) {
    next(error);
  }
}

module.exports = createUser;
