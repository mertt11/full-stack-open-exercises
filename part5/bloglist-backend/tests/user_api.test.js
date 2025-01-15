const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")

beforeEach(async () => {
  await User.deleteMany({})
}, 40000)

test("invalid users are not added", async () => {
  const usersAtStart = await helper.usersInDb()
  const invalidUser = {
    username: "a",
    name: "heeyyy",
    password: "123444",
  }

  await api.post("/api/users").send(invalidUser).expect(400)

  const usersAtEnd = await helper.usersInDb()
  assert.deepStrictEqual(usersAtStart.length, usersAtEnd.length)
  const usernames = usersAtEnd.map((u) => u.username)
  assert(!usernames.includes(invalidUser))
})

test.only("same username can not be addwd twice", async () => {
  const newUser = {
    username: "newuser",
    name: "New User",
    password: "password",
  }

  await api.post("/api/users").send(newUser)
  const usersAtStart = await helper.usersInDb()

  await api.post("/api/users").send(newUser).expect(400)
  const usersAtEnd = await helper.usersInDb()

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
}, 40000)
after(async () => {
  await mongoose.connection.close()
})
