const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const { getOrder, placeOrder,deleteOrder } = require("../controllers/Order");

const app = express();

router.route("/").get(getOrder);
router.route("/createOrder").post(protect, placeOrder);
router.route("/deleteOrder/:id").delete(protect, deleteOrder);

module.exports = router;
