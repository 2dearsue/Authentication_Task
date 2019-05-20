const express = require("express");
const app = express();

const morgan = require("morgan");
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
// const createError = require('http-errors');

const connectToDB = require("./helpers/connectDB");
const userRouter = require("./routes/userRouter");
const imageRouter = require("./routes/imageRouter");
const errorHandler = require("./middleware/error");

mongoose.set('useNewUrlParser', true);

connectToDB();

app.listen(PORT, async() => {
  try {
    console.log('Server is listening.');
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to mongoose');
  } catch (error) {
    console.log(error);
  }
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(express.static('browser/dist'))
app.use(cookieParser()) // creates req.cookies to read from and the res.cookie to write to a cookie
app.use("/users", userRouter);
app.use("/images", imageRouter);

app.use(errorHandler);

console.log(`Server listen to ${PORT}`);
