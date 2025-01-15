const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const config = require("./utils/config")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

mongoose.set("strictQuery", false)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected")
  })
  .catch(() => {
    logger.error("error connecting")
  })

app.use(middleware.tokenExtractor)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app