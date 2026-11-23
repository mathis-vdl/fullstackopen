import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, test, expect, vi } from 'vitest'


describe('Blog', () => {
  const blog = {
    id: '123',
    title: 'Testing',
    author: 'Mathis',
    url: 'https://eyiuvhoidjpq',
    likes: 7,
    user: { username: 'mathis', name: 'Mathis', id: 'u1' }
  }

  test('renders title and author but not url or likes by default', () => {
    render(<Blog blog={blog} user={null} handleLike={vi.fn()} handleRemove={vi.fn()} />)

    expect(screen.getByText('Testing', { exact: false })).toBeDefined()
    expect(screen.getByText('Mathis', { exact: false })).toBeDefined()

    expect(screen.queryByText('https://eyiuvhoidjpq')).toBeNull()
    expect(screen.queryByText('likes 7', { exact: false })).toBeNull()
  })

  test('shows url and likes when the view button is clicked', async () => {
    render(<Blog blog={blog} user={null} handleLike={vi.fn()} handleRemove={vi.fn()} />)

    const user = userEvent.setup()
    await user.click(screen.getByText('view'))

    expect(screen.getByText('https://eyiuvhoidjpq')).toBeDefined()
    expect(screen.getByText('likes 7', { exact: false })).toBeDefined()
  })

  test('clicking like twice calls the handler twice', async () => {
    const mockHandler = vi.fn()
    render(<Blog blog={blog} user={null} handleLike={mockHandler} handleRemove={vi.fn()} />)

    const user = userEvent.setup()
    await user.click(screen.getByText('view'))

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})