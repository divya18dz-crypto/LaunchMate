const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_here";

// POST: Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      mobile: req.body.mobile, // Added mobile support
      password: hashedPassword,
    });

    await newUser.save();

    // Create token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ message: "User created successfully", token, user: { name: newUser.name, email: newUser.email } });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// POST: Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ message: "Login successful", token, user: { name: user.name, email: user.email, mobile: user.mobile } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// POST: Forgot Password (Verification)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email, mobile } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "No account found with this email" });
    }

    if (user.mobile !== mobile) {
      return res.status(400).json({ error: "Mobile number mismatch" });
    }

    res.status(200).json({ message: "Identity verified. You can now reset your password." });
  } catch (err) {
    res.status(500).json({ error: "Error during verification" });
  }
});

// POST: Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, mobile, newPassword } = req.body;
    const user = await User.findOne({ email, mobile });

    if (!user) {
      return res.status(400).json({ error: "Unauthorized reset attempt" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error resetting password" });
  }
});

module.exports = router;
