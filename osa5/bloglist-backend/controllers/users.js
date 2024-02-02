const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit'); 

const createUserLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: 'Too many accounts created from this IP, please try again after 15 minutes',
});

const userRouter = express.Router();

userRouter.use('/create', createUserLimiter); 
userRouter.post('/create', async (req, res) => {
  const { username, name, password } = req.body;

  if (password.length < 3) {
    return res.status(400).json({ error: 'Password must be at least 3 characters long.' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already taken.' });
  }

  const saltRounds = process.env.SALT_ROUNDS || 10; 
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    password: passwordHash,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json({ message: 'User created successfully.', userId: savedUser._id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user.' });
  }
});

module.exports = userRouter;
