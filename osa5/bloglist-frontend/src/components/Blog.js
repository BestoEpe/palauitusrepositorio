import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const blog = props.blog
  const [visible, setVisible] = useState(false)
  const visibilityToggle = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const upvote = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(updatedBlog)
  }

  const remove = () => {
    props.removeBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={visibilityToggle}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={upvote}>like</button> </p>
        {blog.user &&
          <p>{blog.user.username}</p>
        }
        {blog.user.name === props.user.name && (
          <button id="delete-btn" onClick={remove}>
              delete
          </button>
        )}
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog