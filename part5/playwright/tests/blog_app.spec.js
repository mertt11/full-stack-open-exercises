const { test, expect, beforeEach, describe } = require("@playwright/test")
import { loginWith, createBlog } from "./helper"

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset")
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "mertg",
        name: "mert gokce",
        password: "1234",
      },
    })

    await page.goto("http://localhost:5173")
  })

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible()
    await expect(page.getByText("Username")).toBeVisible()
    await expect(page.getByText("Password")).toBeVisible()
    await expect(page.getByRole("button", { name: "login" })).toBeVisible()
  })

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      const usernameDiv = await page.getByText("Username").locator("..")
      const passwordDiv = page.getByText("Password").locator("..")

      await usernameDiv.getByRole("textbox").fill("mertg")
      await passwordDiv.getByRole("textbox").fill("1234")
      await page.getByRole("button", { name: "login" }).click()
      await expect(page.getByText("mert gokce logged in")).toBeVisible()
    })

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mert", "1234")

      const errorDiv = await page.locator(".error")
      await expect(errorDiv.getByText("Wrong credentials")).toBeVisible()
    })
  })

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mertg", "1234")
      await createBlog(page, "Psikaanaliz", "sigmund frued", "frued.com")
    })

    test("a new blog can be created", async ({ page }) => {
      expect(await page.locator(".success")).toContainText(
        "a new blog Psikaanaliz by sigmund frued added"
      )
    })

    test("blog can be liked", async ({ page }) => {
      await page
        .getByText("Psikaanaliz sigmund frued")
        .getByRole("button", { name: "view" })
        .click()

      await expect(page.getByText("likes 0")).toBeVisible()
      await page.getByRole("button", { name: "like" }).dblclick()
      await expect(page.getByText("likes 1")).toBeVisible()
    })

    test("user who added the blog can delete the blog", async ({ page }) => {
      await page
        .getByText("Psikaanaliz sigmund frued")
        .getByRole("button", { name: "view" })
        .click()

      await page.getByRole("button", { name: "remove" }).click()
      await page.on("dialog", (dialog) => dialog.accept())
      await expect(
        page.getByText("Psikaanaliz sigmund frued")
      ).not.toBeVisible()
    })
  })
})
