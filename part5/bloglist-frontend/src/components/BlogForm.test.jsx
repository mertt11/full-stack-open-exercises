import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("blog form sending a blog", async() => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={createBlog}/>)
  const title = screen.getByPlaceholderText("title")
  const author = screen.getByPlaceholderText("author")
  const url = screen.getByPlaceholderText("url")
  const sendButton = screen.getByText("create")
  await user.type(title,"Power")
  await user.type(author,"Robert Greene")
  await user.type(url,"rober.com")
  await user.click(sendButton)
  expect(createBlog.mock.calls).toHaveLength(1)
})
