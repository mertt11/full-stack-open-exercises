const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test("first blog title is MyNlog", async () => {
  const response = await api.get("/api/blogs")
  const firstBlog = response.body[0]
  assert.strictEqual(firstBlog.title, "MyNlog")
})

test("valid blog can be added", async () => {
  const newBlog = {
    title: "Blogggg",
    author: "sdfsdfsdf",
    url: "String",
    likes: 20,
  }
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((r) => r.title)
  assert(titles.includes(newBlog.title))
})

test("title or url is missing", async () => {
  const newBlog = {
    author: "ddddd",
    url: "ggggg",
    likes: 20,
  }
  await api.post("/api/blogs").send(newBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

  const authors = blogsAtEnd.map((r) => r.author)
  assert(!authors.includes(newBlog.author))
}, 6000)

test("if likes missing equal to 0", async () => {
  const newBlog = {
    title: "Blogggg",
    author: "sdfsdfsdf",
    url: "String",
  }

  await api.post("/api/blogs").send(newBlog).expect(201)
  const blogsAtEnd = await helper.blogsInDb()
  const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  assert.strictEqual(lastBlog.likes, 0)
}, 2000)

test("id is defined", async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]
  assert(blogToView.id !== undefined)
})

test("deleting a single blog post", async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  assert(!blogsAtEnd.includes(blogToDelete))
})

test("updating a single blog post", async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToBeUpdated = blogsAtStart[0]
  const updatedLikes = 40

  await api
    .put(`/api/blogs/${blogToBeUpdated.id}`)
    .send({ likes: updatedLikes })
    .expect(200)
  const blogsAtEnd = await helper.blogsInDb()

  assert(!blogsAtEnd.includes(blogToBeUpdated))
}, 12000)

after(async () => {
  await mongoose.connection.close()
})
