const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  name: String,
  img: String,
  rating: Number,
  likes: String,
  description: String,
  price: Number,
  Dprice: Number,
  Off: String,
});

module.exports = mongoose.model("Card", CardSchema);
