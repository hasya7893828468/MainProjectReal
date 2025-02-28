const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'); // ✅ Add this line

const User = require('../models/User');

// ✅ Register New User
router.post('/register', async (req, res) => {
  const { name, email, password, address, phone } = req.body;

  if (!name || !email || !password || !address || !phone) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword, address, phone });
    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    res.status(200).json({
      success: true,
      msg: 'Login successful',
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      address: user.address,
      phone: user.phone
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Get User by ID
// ✅ Get User by ID
router.get('/user/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid User ID' });
    }

    // Fetch user data excluding password
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    console.log("✅ Found user:", user);
    res.json({
      name: user.name || "Unknown",
      email: user.email || "No email provided",
      address: user.address || "No address provided",
      phone: user.phone || "No phone provided"
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ msg: 'Server error' });
  }
});




module.exports = router;
