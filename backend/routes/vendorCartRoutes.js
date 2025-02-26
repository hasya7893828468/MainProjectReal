const express = require("express");
const VendorCart = require("../models/VendorCart");

const router = express.Router();

// ✅ Store Order in Vendor's Cart (Include userName)
router.post("/add-order", async (req, res) => {
  try {
    const { vendorId, userId, userName, cartItems } = req.body;

    if (!vendorId || !userId || !userName || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newOrder = new VendorCart({
      vendorId,
      userId,
      userName,  // ✅ Save userName
      cartItems,
      createdAt: new Date(), // ✅ Save Order Date
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Fetch Vendor's Orders (Include userName)
router.get("/:vendorId", async (req, res) => {
  try {
    const { vendorId } = req.params;
    const orders = await VendorCart.find({ vendorId });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
