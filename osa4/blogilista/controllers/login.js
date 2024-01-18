const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const { generateErrorResponse, generateSuccessResponse } = require('../utils/responseGenerator');

const loginRouter = express.Router();

// Handle login requests
loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });
    const passwordCorrect = user ? await bcrypt.compare(password, user.passwordHash) : false;

    if (!passwordCorrect) {
      return response.status(401).json(generateErrorResponse('Invalid username or password'));
    }

    const userForToken = { username: user.username, id: user._id };
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });

    response.status(200).json(generateSuccessResponse({
      token,
      username: user.username,
      name: user.name,
      id: user._id
    }));
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
