const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Mathis Vidal',
        username: 'mvidal',
        password: 'motdepasse123'
      }
    })

    await page.goto('http://localhost:5173')
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mvidal', 'motdepasse123')
      await expect(page.getByText('Mathis Vidal logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mvidal', 'wrong')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(page.getByRole('alert')).toContainText('wrong username or password')
      await expect(page.getByText('Mathis Vidal logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mvidal', 'motdepasse123')
      await expect(page.getByText('Mathis Vidal logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      const title = 'E2E testing'
      await createBlog(page, title, 'Mathis', 'https://ethersgvd')
      await expect(page.getByRole('link', { name: title })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      const title = 'Likeable blog'
      await createBlog(page, title, 'Mathis', 'https://milougkiytjdhrg')
      await page.getByRole('link', { name: title }).click()
      await expect(page.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      const title = 'Blog to delete'
      await createBlog(page, title, 'Mathis', 'https://iyjugtr')
      await page.getByRole('link', { name: title }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
      await expect(page.getByRole('link', { name: title })).toHaveCount(0)
    })
  })
})
