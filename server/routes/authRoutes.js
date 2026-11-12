
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    // Clean and validate email
    const cleanEmail = String(email).trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address."
      });
    }

    // Validate password
    if (String(password).length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters."
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      email: cleanEmail
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in MongoDB
    const user = await User.create({
      email: cleanEmail,
      password: hashedPassword
    });

    // Send success response
    res.status(201).json({
      message: "Account created successfully!",
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    console.error("Signup error:", error);

    res.status(500).json({
      message: "Server error. Please try again."
    });
  }
});

module.exports = router;
