import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ msg: null, type: null })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortLike(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("LoggedInUser")
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("LoggedInUser", JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setMessage({ msg: "Wrong credentials", type: "error" })
      setUsername("")
      setPassword("")
      setTimeout(() => {
        setMessage({ msg: null, type: null })
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification message={message} />
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </div>
  )

  const removeFromLocalStorage = () => {
    window.localStorage.removeItem("LoggedInUser")
    setUser(null)
  }

  const addBlog = (blogObject) => {
    const { title, author, url } = blogObject

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })

    setMessage({ msg: `a new blog ${title} by ${author} added`, type: "success" })
    setTimeout(() => {
      setMessage({ msg: null, type: null })
    }, 5000)

    blogFormRef.current.toggleVisibility()
  }

  const sortLike = (arr) => {
    return arr.sort((a, b) => b.likes - a.likes)
  }

  const handleLike = async (blog) => {
    const newBlog = {
      ...blog,
      likes:blog.likes+1
    }
    try{
      const updatedBlog = await blogService.update(blog.id,newBlog)
      setBlogs(blogs.map(blog => blog = blog.id === updatedBlog.id ? updatedBlog : blog ))
    }catch(e){
      console.log(e)
    }
  }

  const handleDelete = async (blog) => {
    try{
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
        await blogService.del(blog.id)
        setBlogs(prevBlogs => prevBlogs.filter(b => b.id!==blog.id))
        setMessage({ msg: `Deleted blog: ${blog.title}`, type: "success" })
      }
    }catch(error){
      setMessage({ msg: "You dont have authority to delete this blog", type: "error" })
    }
    setTimeout(() => {
      setMessage({ msg: null, type: null })
    }, 5000)
  }


  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in <button onClick={removeFromLocalStorage}>logout</button></p>
      <Togglable text='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          handleLike={() => {handleLike(blog)}}
          handleDelete={() => {handleDelete(blog)}}
          user={user}
        />
      )}
    </div>
  )

  return (
    user === null ? loginForm() : blogForm()
  )
}

export default App
