const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectToDB = async () => {
  try {
    console.log("seconds before connecting");
    await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
    console.log("Database is connected");
  } catch(error){
    console.log(error);
  }
}

module.exports = connectToDB;
