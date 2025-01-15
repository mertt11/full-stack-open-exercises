const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, curr) => (sum += curr.likes), 0)
}

const favoriteBlog = (blogs) => {
  const mostLike = Math.max(...blogs.map((blog) => blog.likes))
  return blogs.find((blog) => blog.likes === mostLike)
}

const initializeAuthors = (uniqueAuthors) => {
  const myObj = {}
  uniqueAuthors.forEach((item) => (myObj[item] = 0))
  return myObj
}

const mostBlogs = (blogs) => {
  const uniqueAuthors = new Set()
  blogs.forEach((blog) => uniqueAuthors.add(blog.author))
  const authors = initializeAuthors([...uniqueAuthors])

  const auths = blogs.map((blog) => blog.author)

  auths.forEach((item) => {
    if (Object.keys(authors).includes(item)) {
      authors[item] += 1
    }
  })
  const maxBlog = Math.max(...Object.values(authors))
  const authorName = Object.keys(authors).find((item) => {
    if (maxBlog === authors[item]) {
      return item
    }
  })

  return { author: authorName, blogs: maxBlog }
}

const mostLikes = (blogs) => {
  likes = blogs.map((blog) => blog.likes)
  const mostLike = likes.reduce((max, curr) => {
    if (max > curr) {
      return max
    } else {
      return curr
    }
  })
  const author = blogs.find((blog) => blog.likes === mostLike).author
  return { author: author, likes: mostLike }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
