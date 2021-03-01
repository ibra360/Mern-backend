var express = require("express");
var router = express.Router();
const { getUsers, registerUser, loginUser } = require("../controllers/User.js");

router.route("/").get(getUsers);
// router.route(`/:id`).get(getSingleProduct);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// router.route(`/delete/:id`).delete(deleteSingleProduct);

module.exports = router;
