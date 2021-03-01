var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')


var Schema = mongoose.Schema;
// var timestamps = require("mongoose-timestamp");

var UserSchema = new Schema({
  name: {
    type: String,
    require: false,
    maxLength: [20, "Name should not exceed more than 20 characters"],
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: false,
    // minLength: [4, 'Password must contain atleast 4 characters'],
    // maxLength: [12, "Password should not exceed more than 12 characters"],

  },
  Contact_No: {
    type: Number,
    required: false,
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: false,
    },
  ],
});





module.exports = mongoose.model("User", UserSchema);
