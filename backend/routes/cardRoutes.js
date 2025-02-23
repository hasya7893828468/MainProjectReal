const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

// Get all card data
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
