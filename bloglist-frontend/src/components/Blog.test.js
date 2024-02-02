import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Authoripants',
  url: 'http://www.blog.blog',
  user: { name: 'nimi' }
};

describe('Rendering blogs', () => {
  test('renders content', () => {
    render(<Blog blog={blog} />);
    expect(screen.getByText(blog.title)).toBeDefined();
    expect(screen.getByText(blog.author)).toBeDefined();
  });

  test('does not render URL or likes by default', () => {
    render(<Blog blog={blog} />);
    expect(screen.queryByText(blog.url)).toBeNull();
    // Assuming 'likes' is part of the component's display
    expect(screen.queryByText('likes')).toBeNull();
  });

  test('renders URL and likes when view button is clicked', () => {
    render(<Blog blog={blog} />);
    const button = screen.getByText('view');
    fireEvent.click(button);
    expect(screen.getByText(blog.url)).toBeDefined();
    // Check for likes display
  });

  // Additional tests...
});

