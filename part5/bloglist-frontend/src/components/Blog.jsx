import {useState,React } from 'react'
import blogService from '../services/blogs'

const LikeButton = ({blog,text,onLike}) => {
  const handleIncrease = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    blogService.update(blog.id, updatedBlog).then((returnedBlog) => {
      onLike(returnedBlog)
    })
  };

  return (
    <button onClick={handleIncrease}>{text}</button>
  )
}

const DeleteButton = ({blog,handleDelete}) => {
  const handleDeletion = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      handleDelete(blog.id)
    }
  }
  return (
    <button onClick={handleDeletion}>remove</button>
  )
}

const Blog = ({ blog,onLike,handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const buttonStyle = {
    marginLeft:10
  }

  const [visible,setVisible] = useState(false)
  const hideWhenVisible = {display:visible ? 'none' : ''}
  const showWhenVisible = {display:visible ? '' : 'none'}

  const toggleVisibility = () =>{
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}

      <span style={hideWhenVisible}>
        <button style={buttonStyle} onClick={toggleVisibility}>view</button>
      </span>

      <span style={showWhenVisible}>
        <button style={buttonStyle} onClick={toggleVisibility}>hide</button>
        {visible && <div>
          {blog.url} <br />
          likes {blog.likes} <LikeButton blog={blog} text='like' onLike={onLike}/><br />
          {blog.author} <br />
        </div>}
        <DeleteButton blog={blog} handleDelete={handleDelete}/>
      </span>

    </div>  
  )
}


export default Blog