// const express = require("express");
// const router = express.Router();
// const Card = require("../models/Card");

// // Get all card data
// router.get("/", async (req, res) => {
//   try {
//     const cards = await Card.find();
//     res.json(cards);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;


const express = require("express");
const Card = require("../models/Card");

const router = express.Router();

// ✅ Get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cards" });
  }
});

// ✅ Add a new card
router.post("/", async (req, res) => {
  try {
    const newCard = new Card(req.body);
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: "Error adding card" });
  }
});

// ✅ Delete a card by ID
router.delete("/:id", async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting card" });
  }
});

module.exports = router;
