const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

const router = express.Router();

// route to handle user SignUp
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});


// route to handle user Login

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      console.log("here");

      const validUser = { name: username };

      // Return a token, session, or cookie to authenticate the user
      const accessToken = jwt.sign(validUser, process.env.JWT_SECRET);
      console.log(`this is ${accessToken}`);
    // res.json({  });
      res.status(200).json({ message: 'Login successful', accessToken: accessToken});
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  });
  

module.exports = router;
