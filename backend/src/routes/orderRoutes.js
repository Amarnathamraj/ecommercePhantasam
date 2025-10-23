const express=require("express");
const {
  createNewOrder,
  verifyPayment,
  fetchOrders,
} = require("../controllers/orderController");
const protect  = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, createNewOrder);
router.post("/verify", protect, verifyPayment);
router.get("/", protect, fetchOrders);

module.exports = router;
