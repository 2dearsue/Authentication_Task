const express = require("express");
const userRouter = express.Router
const {createUser, getUser} = require("../helpers/usersMethods");

userRouter.post("/create/", createUser);
userRouter.post("/login/", getUser);

module.exports = userRouter;
