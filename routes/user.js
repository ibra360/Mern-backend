var express = require("express");
var router = express.Router();
const {
  getUsers,
  registerUser,
  loginUser,
  deleteUser,
} = require("../controllers/User.js");

router.route("/").get(getUsers);
// router.route(`/:id`).get(getSingleProduct);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route(`/deleteUser/:id`).delete(deleteUser);

module.exports = router;
