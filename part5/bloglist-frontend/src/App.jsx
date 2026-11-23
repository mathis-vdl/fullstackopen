import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useMatch } from 'react-router-dom'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      navigate('/')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    navigate('/')
  }

  const handleLike = async (blog) => {
    const updatedData = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedData)
      setBlogs(blogs.map((b) => (b.id === blog.id ? returnedBlog : b)))
    } catch (exception) {
      console.log('error: ', exception.response.data)
      notify('like failed', 'error')
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      navigate('/')
      return true
    } catch (exception) {
      console.log('error: ', exception.response.data)
      notify('blog creation failed', 'error')
      return false
    }
  }

  const handleRemove = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      notify(`removed ${blog.title}`)
      navigate('/')
    } catch (exception) {
      console.log('error: ', exception.response.data)
      notify('remove failed', 'error')
    }
  }

  const notify = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null


  return (
    <Container>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">blogs</Button>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/create">create new</Button>
              <Typography sx={{ flexGrow: 1, ml: 2 }}>{user.name} logged in</Typography>
              <Button color="inherit" onClick={handleLogout}>logout</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">login</Button>
          )}
        </Toolbar>
      </AppBar>

      <Notification message={message} type={messageType} />

      <Routes>
        <Route path="/" element={<BlogList blogs={sortedBlogs} />} />
        <Route
          path="/blogs/:id"
          element={<BlogView blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} />}
        />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path="/create"
          element={user ? <BlogForm createBlog={addBlog} /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </Container>
  )
}

export default App
