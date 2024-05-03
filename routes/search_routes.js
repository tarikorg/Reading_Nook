
const express = require('express')
const axios = require('axios')

const apiKey = 'AIzaSyAOD6hItdBXOMpq9mEv7fMemrYFtIM1DKE' // Replace with your actual Google Books API key

// Function to make a Google Books API request
async function searchGenre(searchTerm, maxResults, startIndex) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${maxResults}&startIndex=${startIndex}&key=${apiKey}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

// Function to pick a random number within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const router = express.Router()

// Route handler to get random fiction books
router.get('/search/:genre', async (req, res) => {
  const searchInput = req.params.genre

  const searchTerm = searchInput
  const maxResults = 25
  const desiredBooks = 5
  const randomBooks = []

  try {
    // Initial API call to get the first page and total results
    const initialResults = await searchGenre(searchTerm, maxResults, 0)
    const totalItems = initialResults.totalItems

    // Keep track of selected book IDs to avoid duplicates
    const selectedBookIds = new Set()

    // Loop until the targeted amount
    while (randomBooks.length < desiredBooks) {
      //random index within total results
      const randomIndex = getRandomInt(0, Math.min(totalItems - 1, maxResults - 1))

      //Check if this index is already chosen and within retrieved results
      // if (!randomBooks.includes(randomIndex) && randomIndex < initialResults.items.length) {
      //   randomBooks.push(initialResults.items[randomIndex])

      // }

      if (randomIndex < initialResults.items.length) {
        const randomBook = initialResults.items[randomIndex];
        const bookId = randomBook.id;

        // Check if the book ID is unique
        if (!selectedBookIds.has(bookId)) {
          randomBooks.push(randomBook);
          selectedBookIds.add(bookId);
        }
      }
    }


    // res.json(randomBooks)
    res.render('search', {
      books: randomBooks,
      btn1: 'Favorites',
      href1: '/favorites',
      btn2: 'Logout',
      href2: '/logout'
    });
  } catch (error) {
    console.error(error)
    res.status(500).send('Error retrieving books')
  }
})

router.post('/search/title/', async (req, res) => {
  // const searchedName = req.params.book_name.replace(' ','%20')
  const { title, author } = req.body
  const titleInject = ''
  const authorInject = ''

  console.log(req.body)
  console.log(title)
  console.log(author)
  const searchedBook = []
  // const url2 = `https://www.googleapis.com/books/v1/volumes?${titleInject}+${authorInject}&maxResults=5&key=${apiKey}`

  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&maxResults=5&key=${apiKey}`
  try {
    const response = await axios.get(url)

    searchedBook.push(response.data)
    console.log(searchedBook[0].items)
    res.render('search', {
      books: searchedBook[0].items,
      btn1: 'Favorites',
      href1: '/favorites',
      btn2: 'Logout',
      href2: '/logout'
    })
    // return response.data
  } catch (err) {
    console.error(err)
  }
})

module.exports = router







