// Import necessary modules
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users');

// Initialize express application
const app = express();

// ************** Controller function to login a user ************** //


// Define POST route for '/api/login'
const loginUser = async (req, res) => {
  // Destructure email and password from request body
  const { email, password } = req.body;

  try {
    // Attempt to find user with provided email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare provided password with stored user password
    const validPassword = await bcrypt.compare(password, user.password);

    // If password is not valid, return error
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // If email and password are valid, sign a new JWT
    const token = jwt.sign({ id: user.id}, 'your_jwt_secret');

    // Send JWT in response
    res.json({ token, user });
  } catch (error) {
    // If any errors occur, return server error
    res.status(500).json({ error: 'Server error' });
  }
};

// ***********************************************************  //



// **************** Controller function to register a new user **************** //

const signupUser = async (req, res) => {
  const { email, password, role, firstName } = req.body;

  console.log("HELLO SIGNUP")

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ email, password: hashedPassword, role, firstName });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// ***********************************************************  //


// ************** Controller function to get user profile ************** //

const getUserProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUserProfile,
};
