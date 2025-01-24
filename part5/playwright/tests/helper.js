const { test, expect, beforeEach, describe } = require("@playwright/test")

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "new blog" }).click()
  await page.getByText("title:").getByRole("textbox").fill(title)
  await page.getByText("author:").getByRole("textbox").fill(author)
  await page.getByText("url:").getByRole("textbox").fill(url)
  await page.getByRole("button", { name: "create" }).click()
}

const loginWith = async (page, username, password) => {
  const usernameTextbox = await page.getByTestId("username")
  const passwordTextbox = await page.getByTestId("password")

  await usernameTextbox.fill(username)
  await passwordTextbox.fill(password)
  await page.getByRole("button", { name: "login" }).click()
}

module.exports = { createBlog, loginWith }
