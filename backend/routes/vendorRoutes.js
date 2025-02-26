const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");

const router = express.Router(); // ✅ Define `router`

// ✅ Vendor Registration Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ error: "Vendor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = new Vendor({ name, email, password: hashedPassword });
    await vendor.save();

    res.status(201).json({ message: "Vendor registered successfully!" });
  } catch (error) {
    console.error("❌ Vendor Registration Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Vendor Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(400).json({ error: "Vendor not found" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ vendorId: vendor._id }, "your_secret_key", { expiresIn: "1h" });

    res.json({ message: "Login successful", token, vendorId: vendor._id });
  } catch (error) {
    console.error("❌ Vendor Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router; // ✅ Export `router`
