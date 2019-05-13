const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   userName: {type: String, required: true},
   password: {type: String, mingLength: [8, 'Password must be at least 8 characters long'], maxLength: [20, 'Password must not exceed 20 characters']},
   hobbies : { type : Array , "default" : [] }
}, {versionKey: false})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
