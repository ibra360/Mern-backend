var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Product = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: [20, "Title should not exceed more than 20 characters"],
  },

  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  images: {
    type: Array,
    require: true,
  },
  agent: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});
module.exports = mongoose.model("products", Product);
