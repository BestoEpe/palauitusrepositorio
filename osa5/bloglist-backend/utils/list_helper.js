const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs === 0) {
    return
  }
  const mostLikes = blogs.reduce((mostLikes, blog) => blog.likes > mostLikes ? blog.likes : mostLikes, blogs[0].likes)
  return blogs.find(blog => blog.likes == mostLikes)
}

const mostBlogs = (blogs) => {
  if (blogs === 0) {
    return
  }
  let counter = {}
  for (let value of blogs.flat()) {
    if (counter[value.author]) {
      counter[value.author] += 1
    } else {
      counter[value.author] = 1
    }
  }
  const blogsCount = Math.max(...Object.values(counter))
  const authorsName = Object.keys(counter).filter(author => counter[author] === blogsCount)[0]
  return {author : authorsName , blogs : blogsCount}
}

const mostLikes = (blogs) => {
  if (blogs === 0) {
    return
  }
  let counter = {}
  for (let value of blogs.flat()) {
    if (counter[value.author]) {
      counter[value.author] += value.likes
    } else {
      counter[value.author] = value.likes
    }
  }
  const likesCount = Math.max(...Object.values(counter))
  const authorsName = Object.keys(counter).filter(author => counter[author] === likesCount)[0]
  return {author : authorsName , likes : likesCount}
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
