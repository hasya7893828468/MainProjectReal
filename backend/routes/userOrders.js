const express = require("express");
const router = express.Router();
const UserOrder = require("../models/UserOrder");

// ✅ Fetch Orders for a Specific User, Including Vendor Details
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("🔍 Fetching orders for userId:", userId);

        const orders = await UserOrder.find({ userId: String(userId) });

        if (!orders.length) {
            console.log("❌ No orders found for this user.");
            return res.status(404).json({ message: "No orders found" });
        }

        console.log("✅ Orders Found:", orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ Error fetching user orders:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

module.exports = router;
