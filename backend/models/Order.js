const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  vendorId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },

  // ✅ Store exact user location
  userLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },

  cartItems: [
    {
      name: String,
      img: String,
      price: Number,
      quantity: Number,
      totalPrice: Number,
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
