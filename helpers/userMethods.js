const userModel = require("../models/userModel");

const createUser = async (req, res, next) => {
  try {
    const user = await userModel.create (
      req.body
    )
    res.status(200).json({msg: `The user ${userName} was succesful created!`})
  } catch (error) {
    console.log(error);
  }
}

module.exports = {createUser};
