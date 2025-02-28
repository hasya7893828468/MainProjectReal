const express = require("express");
const router = express.Router();
const VendorOrder = require("../models/VendorOrder");

// ✅ Add New Order
router.post("/add-order", async (req, res) => {
  try {
    const { vendorId, userId, userName, cartItems } = req.body;

    if (!vendorId || !userId || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("🛍️ Adding new order:", { vendorId, userId, userName, cartItems });

    const newOrder = new VendorOrder({ vendorId, userId, userName, cartItems });

    await newOrder.save();

    console.log("✅ Order successfully added");
    res.status(201).json({ message: "Order added successfully", order: newOrder });
  } catch (error) {
    console.error("❌ Error adding order:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
