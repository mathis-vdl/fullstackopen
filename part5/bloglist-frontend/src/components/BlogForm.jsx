import { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const success = await createBlog({ title, author, url })
    if (success) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <Box component="form" onSubmit={addBlog} sx={{ maxWidth: 500 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        create new
      </Typography>
      <TextField label="title" value={title} onChange={({ target }) => setTitle(target.value)} fullWidth margin="normal" />
      <TextField label="author" value={author} onChange={({ target }) => setAuthor(target.value)} fullWidth margin="normal" />
      <TextField label="url" value={url} onChange={({ target }) => setUrl(target.value)} fullWidth margin="normal" />
      <Button variant="contained" type="submit" sx={{ mt: 1 }}>
        create
      </Button>
    </Box>
  )
}

export default BlogForm