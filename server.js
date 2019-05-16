const express = require("express");
const app = express();

const morgan = require("morgan");
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
const port = 5000;
// const createError = require('http-errors');

const connectToDB = require("./helpers/connectDB");
const userRouter = require("./routes/userRouter");
const imageRouter = require("./routes/imageRouter");
const errorHandler = require("./middleware/error");

connectToDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('browser'))
app.use(cookieParser()) // creates req.cookies to read from and the res.cookie to write to a cookie
app.use("/users", userRouter);
app.use("/images", imageRouter);

app.use(errorHandler);

app.listen(port);

console.log(`Server listen to ${port}`);
