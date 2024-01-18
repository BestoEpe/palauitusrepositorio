const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to log request details
const requestLogger = (request, response, next) => {
  logger.info(`Method: ${request.method}, Path: ${request.path}, Body: ${JSON.stringify(request.body)}`);
  logger.info('---');
  next();
};

// Middleware for handling unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// Middleware for error handling
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  switch (error.name) {
    case 'CastError':
      return response.status(400).send({ error: 'malformatted id' });
    case 'ValidationError':
      return response.status(400).json({ error: error.message });
    case 'JsonWebTokenError':
      return response.status(400).json({ error: 'token missing or invalid' });
    case 'TokenExpiredError':
      return response.status(401).json({ error: 'token expired' });
    default:
      next(error);
  }
};

// Middleware to extract token from request header
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    return response.status(401).json({ error: 'token required' });
  }
  next();
};

// Middleware to extract user from the token
const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    request.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};
