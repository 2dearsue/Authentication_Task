const express = require("express");
const userRouter = express.Router();
const { createUser, loginUser, handleValidationErrors, updateHobbies, logoutUser } = require("../middleware/userMethods");
const {validateUser, validateHobbyRequest } = require("../helpers/validateUser");
const isAuth = require('../middleware/isAuth')
const validateLogin = [...validateUser]; // spread-Operator because not sharing the same pin
validateLogin.pop(); // deletes the last check because we do not need it!

userRouter.post("/create", validateUser, handleValidationErrors, createUser);
userRouter.post("/login", validateLogin, handleValidationErrors, loginUser);
userRouter.put("/update/hobbies", validateHobbyRequest, handleValidationErrors, isAuth, updateHobbies);
userRouter.get("/logout", isAuth, logoutUser);

module.exports = userRouter;
