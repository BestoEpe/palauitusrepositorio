const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');
const router = express.Router();

router.post('/reset', async (req, res) => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    try {
      await Blog.deleteMany({});
      await User.deleteMany({});
      console.log(`[${new Date().toISOString()}] Database reset performed.`);
      res.status(200).json({ message: 'Database reset successfully.' });
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Database reset error: ${error}`);
      res.status(500).json({ message: 'Database reset failed.', error: error.message });
    }
  } else {
    res.status(403).json({ message: 'Database reset is not allowed in the current environment.' });
  }
});

module.exports = router;
