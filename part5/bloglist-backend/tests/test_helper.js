const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    _id: "675c183f3b6a2c886bba28ce",
    title: "MyNlog",
    author: "Mertt",
    url: "String",
    likes: 12,
    __v: 0,
  },
  {
    _id: "675c184f3b6a2c886bba28d1",
    title: "Blogggg",
    author: "sdfsdfsdf",
    url: "String",
    likes: 20,
    __v: 0,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: "removeSoon" })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
