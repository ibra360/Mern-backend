var express = require("express");
var router = express.Router();
const {
  getProducts,
  createProduct,
  deleteSingleProduct,
  getSingleProduct,
} = require("../controllers/Product.js");

router.route("/").get(getProducts);
router.route(`/:id`).get(getSingleProduct);
router.route("/addProduct").post(createProduct);
router.route(`/delete/:id`).delete(deleteSingleProduct);

module.exports = router;
