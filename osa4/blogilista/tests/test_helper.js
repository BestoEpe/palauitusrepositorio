const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Testblog',
    author: 'Ghostwriter',
    url: 'http://www.testblog.com',
    likes: 5,
  },
  {
    title: 'Blog for testers',
    author: 'Ghostwriter',
    url: 'http://www.testerlife.com',
    likes: 72,
  },
  // Consider adding more diverse blog entries for a thorough testing setup
];

const nonExistingId = async () => {
  try {
    const blog = new Blog({ title: 'Temporary', author: 'TempAuthor' });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
  } catch (error) {
    console.error('Error creating a non-existing ID:', error);
    return null;
  }
};

const blogsInDb = async () => {
  try {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
  } catch (error) {
    console.error('Error retrieving blogs from DB:', error);
    return [];
  }
};

const usersInDb = async () => {
  try {
    const users = await User.find({});
    return users.map(u => u.toJSON());
  } catch (error) {
    console.error('Error retrieving users from DB:', error);
    return [];
  }
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
