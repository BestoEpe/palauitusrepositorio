const express = require('express');
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

const blogsRouter = express.Router();

// Fetch all blogs and populate user details
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

// Add a new blog
blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response, next) => {
  const { title, author, url, likes = 0 } = request.body;
  const user = request.user;

  if (!user) {
    return response.status(401).end();
  }

  const blog = new Blog({ title, author, url, likes, user: user._id });

  try {
    await blog.populate('user', { username: 1, name: 1, id: 1 });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

// Update blog likes
blogsRouter.put('/:id', async (request, response, next) => {
  const { likes } = request.body;

  if (likes === undefined) {
    return response.status(400).end();
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true });
    response.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

// Delete a blog
blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).end();
    }

    const user = request.user;
    if (user._id.toString() !== blog.user.toString()) {
      return response.status(401).end();
    }

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
