const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
];

const blogsInDb = async () => {
  try {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
  } catch (error) {
    console.error("Error fetching blogs from DB:", error);
    return [];
  }
};

const usersInDb = async () => {
  try {
    const users = await User.find({});
    return users.map(user => user.toJSON());
  } catch (error) {
    console.error("Error fetching users from DB:", error);
    return [];
  }
};

module.exports = {
  initialBlogs, blogsInDb, usersInDb
};