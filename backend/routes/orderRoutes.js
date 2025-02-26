// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");

// // ✅ Order Placement Route
// router.post("/add-order", async (req, res) => {
//   try {
//     const { vendorId, userId, userName, cartItems } = req.body;

//     if (!vendorId || !userId || !userName || !cartItems.length) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const newOrder = new Order({
//       vendorId,
//       userId,
//       userName, // ✅ Save userName in the order
//       cartItems
//     });

//     await newOrder.save();
//     res.status(201).json({ message: "Order placed successfully!" });
//   } catch (error) {
//     console.error("❌ Order Placement Error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;
