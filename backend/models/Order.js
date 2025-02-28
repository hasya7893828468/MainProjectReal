const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  vendorId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  status: { type: String, default: "Pending" }, // ✅ Order Status
  cartItems: [
    {
      name: String,
      img: String,
      price: Number,
      quantity: Number,
      totalPrice: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
