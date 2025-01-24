import { useState,React } from "react"

const Blog = ({ blog,handleLike,handleDelete,user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const buttonStyle = {
    marginLeft:10
  }

  const [visible,setVisible] = useState(false)
  const [authority,setAuthority] = useState(false)
  const hideWhenVisible = { display:visible ? "none" : "" }
  const showWhenVisible = { display:visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}

      <span style={hideWhenVisible}>
        <button style={buttonStyle} onClick={toggleVisibility}>view</button>
      </span>

      <span style={showWhenVisible} className="details">
        <button style={buttonStyle} onClick={toggleVisibility}>hide</button>
        {visible && <div>
          {blog.url} <br />
          likes {blog.likes} <button onClick={handleLike}>like</button>
          <br />
          {blog.author} <br />
        </div>}
        {user.username === blog.user.username && <button onClick={handleDelete}>remove</button>}
      </span>
    </div>
  )
}


export default Blog