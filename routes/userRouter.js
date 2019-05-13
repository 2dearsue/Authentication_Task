const express = require("express");
const userRouter = express.Router
const {createUser, getUser} = require("../helpers/usersMethods");
const {validateUser} = require("../helpers/validateUser");

userRouter.post("/create/", validateUser, createUser);
// userRouter.post("/login/", getUser);

module.exports = userRouter;
