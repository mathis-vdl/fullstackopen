import { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    await handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 360 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        login to application
      </Typography>
      <TextField
        label="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" type="submit" sx={{ mt: 1 }}>
        login
      </Button>
    </Box>
  )
}

export default LoginForm