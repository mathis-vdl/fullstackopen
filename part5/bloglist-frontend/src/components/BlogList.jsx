import { Link } from 'react-router-dom'
import {
  Typography, TableContainer, Table, TableBody, TableRow, TableCell, Paper
} from '@mui/material'

const BlogList = ({ blogs }) => (
  <div>
    <Typography variant="h5" component="h2" gutterBottom>
      blogs
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.map(blog => (
            <TableRow key={blog.id} className="blog">
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>{blog.author}</TableCell>
              <TableCell align="right">{blog.likes} likes</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

export default BlogList