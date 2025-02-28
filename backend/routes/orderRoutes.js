const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ✅ Add Order (Place Order)
router.post("/add-order", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
});

// ✅ Get Orders for Vendor
router.get("/:vendorId", async (req, res) => {
  try {
    const orders = await Order.find({ vendorId: req.params.vendorId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

// ✅ Mark Order as Completed
router.post("/complete-order", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.body.orderId, { status: "Completed" });
    res.status(200).json({ message: "Order marked as completed" });
  } catch (error) {
    res.status(500).json({ message: "Error completing order", error });
  }
});

module.exports = router;
