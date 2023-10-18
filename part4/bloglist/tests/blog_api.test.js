const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);

  /*   for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  } */
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("is ID written in `id` field insted of `_id`", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("successfull post", async () => {
  const newBlog = {
    title: "tatile",
    author: "w",
    url: "r",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain("tatile");
});

test("deleting a blog post", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const contents = blogsAtEnd.map((r) => r.url);

  expect(contents).not.toContain(blogToDelete.url);
});

test("check if a blog posts without likes exist", async () => {
  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  const addedBlog = await blogsAtEnd.find(
    (blog) => blog.title === "First class tests"
  );
  expect(addedBlog.likes).toBe(0);
}, 22000);
