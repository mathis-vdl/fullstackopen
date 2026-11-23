import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { test, expect, vi } from 'vitest'

test('BlogForm calls createBlog with the right details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  await user.type(screen.getByLabelText('title'), 'A new blog')
  await user.type(screen.getByLabelText('author'), 'Mathis')
  await user.type(screen.getByLabelText('url'), 'https://example.com/new')
  await user.click(screen.getByText('create'))

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'A new blog',
    author: 'Mathis',
    url: 'https://hzguvoihpdjoq'
  })
})