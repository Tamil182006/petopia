const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    console.log("Login successful for user:", username);
    res.json({ message: "Login successful", user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
