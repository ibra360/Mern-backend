var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Product = new Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: false,
  },
  images: {
    type: Array,
    require: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
});
module.exports = mongoose.model("Products", Product);
