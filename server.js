const express = require("express");
const app = express();

const morgan = require("morgan");
const port = 5000;

const userRouter = require("./routes/userRouter");
const errorHandler = require("./helpers/errors");


app.use(express.json());
// second step
app.use(express.urlencoded({extended: false}));
app.use(errorHandler);
app.use(morgan("dev"));
app.use("/users", userRouter);

app.listen(port);

console.log(`Server listen to ${port}`);
