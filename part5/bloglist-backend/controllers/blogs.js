const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const middleware = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).json({ error: "Title or URL is missing" })
  }

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    try {
      const blogToBeDeleted = await Blog.findById(request.params.id)
      const user = request.user
      /*     console.log("user:", user)
      console.log("blogTo be deleted,", blogToBeDeleted) */
      if (user._id.toString() === blogToBeDeleted.user.toString()) {
        await Blog.findByIdAndDelete(blogToBeDeleted._id)
        response.status(204).end()
      } else {
        console.log("second else girdi")
        const getWhoHasAuth = async (userId) => {
          const user = await User.findById(userId)
          return user.name
        }
        return response
          .status(403)
          .json({
            error: `You can't delete this blog, only ${await getWhoHasAuth(
              blogToBeDeleted.user.toString()
            )} has authority to delete this blog`,
          })
          .end()
      }
    } catch (e) {
      response.status(500).json({ error: "int servr err" })
    }
  }
)

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      likes: request.body.likes,
    },
    { new: true }
  )
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
