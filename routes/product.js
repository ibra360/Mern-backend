var express = require("express");
var router = express.Router();

//Protected Route intialization
const { protect } = require("../middleware/auth");

const {
  getProd,
  createProduct,
  updateProduct,
  deleteSingleProduct,
  getSingleProduct,
} = require("../controllers/Product.js");

router.route("/").get(getProd);
router.route(`/:id`).get(protect, getSingleProduct).put(protect, updateProduct);
router.route("/addProduct").post(protect, createProduct);
router.route(`/delete/:id`).delete(protect, deleteSingleProduct);

module.exports = router;
