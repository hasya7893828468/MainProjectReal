const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ✅ Route to place an order
router.post("/add-order", async (req, res) => {
  try {
    const { vendorId, userId, userName, userLocation, cartItems } = req.body;

    if (!userLocation || !userLocation.latitude || !userLocation.longitude) {
      return res.status(400).json({ error: "User location is required." });
    }

    const newOrder = new Order({
      vendorId,
      userId,
      userName,
      userLocation, // ✅ Store location in database
      cartItems,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Route for vendors to get all orders
router.get("/:vendorId", async (req, res) => {
  try {
    const { vendorId } = req.params;
    const orders = await Order.find({ vendorId });

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Route to mark an order as completed
router.post("/complete-order", async (req, res) => {
  try {
    const { orderId } = req.body;
    await Order.findByIdAndUpdate(orderId, { status: "Completed" });

    res.status(200).json({ message: "Order marked as completed!" });
  } catch (error) {
    console.error("❌ Error completing order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
