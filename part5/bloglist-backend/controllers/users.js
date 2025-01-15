const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  response.json(users)
})

usersRouter.delete("/all", async (request, response) => {
  await User.deleteMany({})
  response.status(204).end()
})

usersRouter.delete("/:id", async (request, response) => {
  const id = request.params.id
  await User.findByIdAndRemove(id)
  response.status(204).end()
})

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  const saltRound = 10
  const passwordHash = await bcrypt.hash(password, saltRound)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
