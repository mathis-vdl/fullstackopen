import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlogView from './BlogView'

describe('BlogView', () => {
  const blog = {
    id: '123',
    title: 'Testing the single blog view',
    author: 'Mathis',
    url: 'https://olkijuyhgtr',
    likes: 7,
    user: { username: 'mvidal', name: 'Mathis Vidal', id: 'u1' }
  }

  const renderView = (user) => {
    render(
      <BlogView
        blog={blog}
        user={user}
        handleLike={vi.fn()}
        handleRemove={vi.fn()}
      />
    )
  }

  test('unauthenticated user sees blog info and likes but no buttons', () => {
    renderView(null)
    expect(screen.getByText('Testing the single blog view', { exact: false })).toBeDefined()
    expect(screen.getByText('https://olkijuyhgtr')).toBeDefined()
    expect(screen.getByText('likes 7', { exact: false })).toBeDefined()
    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })

  test('logged in user who is not the creator sees only the like button', () => {
    renderView({ username: 'other', name: 'Other User' })
    expect(screen.getByRole('button', { name: 'like' })).toBeDefined()
    expect(screen.queryByRole('button', { name: 'remove' })).toBeNull()
    expect(screen.queryAllByRole('button')).toHaveLength(1)
  })

  test('the creator sees both like and remove buttons', () => {
    renderView({ username: 'mvidal', name: 'Mathis Vidal' })
    expect(screen.getByRole('button', { name: 'like' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'remove' })).toBeDefined()
  })

})