const _ = require('lodash');

// Dummy function, always returns 1
const dummy = () => 1;

// Calculates the total number of likes across all blogs
const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

// Returns the most popular blog, i.e., the one with the most likes
const favoriteBlog = (blogs) => blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0] || {});

// Returns the author with the most blogs and their count
const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, 'author');
  return _.chain(authorCounts)
    .map((blogs, author) => ({ author, blogs }))
    .maxBy('blogs')
    .value() || {};
};

// Returns the author whose blogs have the most likes, and the total number of likes
const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((acc, { author, likes }) => {
    acc[author] = (acc[author] || 0) + likes;
    return acc;
  }, {});

  return _.chain(authorLikes)
    .map((likes, author) => ({ author, likes }))
    .maxBy('likes')
    .value() || {};
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
