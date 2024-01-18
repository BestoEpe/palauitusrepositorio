const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const { generateErrorResponse } = require('../utils/responseGenerator');

const usersRouter = express.Router();
const SALT_ROUNDS = 10;

// Fetch all users and populate blog information
usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

// Add a new user
usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;

  try {
    if (!password) {
      return response.status(400).json(generateErrorResponse('Password is required'));
    } else if (password.length < 3) {
      return response.status(400).json(generateErrorResponse('Password is too short'));
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json(generateErrorResponse('Username must be unique'));
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
