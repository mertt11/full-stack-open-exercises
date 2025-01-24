import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test("check blog rendering title and author only", () => {
  const blog = {
    title:"On gece",
    author:"Natsume sosaki",
    url:"no url",
    likes:120
  }
  render(<Blog blog={blog}/>)

  const element= screen.getByText("On gece Natsume sosaki")

  expect(element).toBeDefined()
  expect(element).toHaveTextContent("On gece Natsume sosaki")
  expect(element).not.toHaveTextContent("no url")
  expect(element).not.toHaveTextContent("120")
})

test("check blog rendering title and author only", async() => {
  const blog = {
    title:"On gece",
    author:"Natsume sosaki",
    url:"no url",
    likes:120
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText("view")
  await user.click(button)

  expect(container).toHaveTextContent("no url")
  expect(container).toHaveTextContent("likes 120")
})

test("if the like button clicked twice component recevied as props twice", async() => {
  const blog = {
    title:"On gece",
    author:"Natsume sosaki",
    url:"no url",
    likes:120
  }
  const mockHandler = vi.fn()
  render(<Blog blog={blog} handleLike={mockHandler}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText("view")
  await user.click(viewButton)


  const likeButton = screen.getByText("like")
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
