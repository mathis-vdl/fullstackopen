import {
  Card, CardContent, CardActions, Typography, Button, Link as MuiLink
} from '@mui/material'

const BlogView = ({ blog, user, handleLike, handleRemove }) => {
  if (!blog) {
    return null
  }

  const isOwner = user && blog.user && blog.user.username === user.username

  return (
    <Card className="blog-view" sx={{ maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {blog.title}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          by {blog.author}
        </Typography>
        <MuiLink href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </MuiLink>
        <Typography sx={{ mt: 2 }}>likes {blog.likes}</Typography>
        <Typography variant="body2" color="text.secondary">
          added by {blog.user?.name}
        </Typography>
      </CardContent>

      {user && (
        <CardActions>
          <Button variant="outlined" onClick={() => handleLike(blog)}>like</Button>
          {isOwner && (
            <Button variant="outlined" color="error" onClick={() => handleRemove(blog)}>
              remove
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  )
}

export default BlogView