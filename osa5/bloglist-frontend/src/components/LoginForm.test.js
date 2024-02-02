import React from 'react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const mockUpdateBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createNewBlog={mockUpdateBlog}/>)

  const titleInput = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('add')

  await user.type(titleInput[0], 'title')
  await user.type(titleInput[1], 'author')
  await user.type(titleInput[2], 'https://www.test.com')
  await user.click(sendButton)

  expect(mockUpdateBlog.mock.calls).toHaveLength(1)
  expect(mockUpdateBlog.mock.calls[0][0].title).toBe('title')
  expect(mockUpdateBlog.mock.calls[0][0].author).toBe('author')
  expect(mockUpdateBlog.mock.calls[0][0].url).toBe('https://www.test.com')
})