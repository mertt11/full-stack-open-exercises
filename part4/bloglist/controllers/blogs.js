const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { request, response } = require("../app");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("users", { username: 1, name: 1 });
  response.json(blogs);
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  /* const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET); */
  const decodedToken = jwt.verify(request, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
