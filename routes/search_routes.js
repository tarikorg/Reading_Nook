
const express = require('express')
const axios = require('axios')

const apiKey = 'AIzaSyAOD6hItdBXOMpq9mEv7fMemrYFtIM1DKE' // Replace with your actual Google Books API key

// Function to make a Google Books API request
async function searchBooks(searchTerm, maxResults, startIndex) {
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

const router = express.Router();

// Route handler to get random fiction books
router.get('/search/:genre', async (req, res) => {
  const searchInput = req.params.genre
  console.log(searchInput)
  const searchTerm = searchInput
  const maxResults = 25
  const desiredBooks = 5
  const randomBooks = []

  try {
    // Initial API call to get the first page and total results
    const initialResults = await searchBooks(searchTerm, maxResults, 0)
    const totalItems = initialResults.totalItems

    // Loop until we have enough random books
    while (randomBooks.length < desiredBooks) {
      // Pick a random index within total results
      const randomIndex = getRandomInt(0, Math.min(totalItems - 1, maxResults - 1))

      // Check if this index is already chosen and within retrieved results
      if (!randomBooks.includes(randomIndex) && randomIndex < initialResults.items.length) {
        randomBooks.push(initialResults.items[randomIndex])
      } else {
        // If needed, make additional API calls to get more results for picking (not implemented here for simplicity)
        // ... (logic to handle pagination and retrieve more results based on startIndex)
      }
    }

    res.json(randomBooks)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error retrieving books')
  }
})

module.exports = router







