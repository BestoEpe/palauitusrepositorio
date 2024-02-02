const express = require('express');
const Blog = require('../models/blog'); // Assuming Blog model exists
const { checkAuthenticated, validateBlogPost } = require('../middleware'); // Custom middleware

const router = express.Router();

// Middleware to check authentication
router.use(checkAuthenticated);

// Modularized route handlers for improved readability and maintenance
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).send('Error fetching blogs');
  }
});

router.post('/', validateBlogPost, async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).send('Error saving blog');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.json(blog);
  } catch (error) {
    res.status(500).send('Error fetching blog');
  }
});

router.put('/:id', validateBlogPost, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).send('Blog not found');
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).send('Error updating blog');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).send('Blog not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting blog');
  }
});

module.exports = router;
