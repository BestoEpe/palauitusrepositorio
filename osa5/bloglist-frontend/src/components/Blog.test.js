import React from 'react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Blog component tests', () => {
  const tempUser = {
    username: 'username',
    name: 'name',
  }

  const blog = {
    title:'Test',
    author:'TestAuthor',
    url:'test.test',
    likes: 42,
    user: {
      username: 'username',
      name: 'name',
    }
  }
  const user = userEvent.setup()

  let mockUpdateBlog = jest.fn()
  let mockRemoveBlog = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} removeBlog={mockRemoveBlog} user={tempUser}/>
    )
  })

  test('renders only title and author', () => {
    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()
  })

  test('clicking the view button displays rest of information', async () => {
    const button = screen.getByText('view')
    await user.click(button)

    expect(component.container).toHaveTextContent(
      `${blog.url}`
    )

    expect(component.container).toHaveTextContent(
      `${blog.likes}`
    )
  })

  test('clicking the like button twice', async () => {
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})