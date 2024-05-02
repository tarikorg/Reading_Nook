const favButton = document.querySelector('#searchResults')

favButton.addEventListener('change', async (e)=>{
if(e.target.classList.contains('form-checkbox')){
    const bookElement = e.target.closest('.book')
        const bookTitle = bookElement.querySelector('h2').textContent
        
        const bookImage = bookElement.querySelector('img').getAttribute('src')
        const bookId = bookElement.dataset.id

        const bookData = {
            title: bookTitle,
            api_id: bookId,
            image: bookImage
        };
      
       if (e.target.checked) {
        // The checkbox was just checked, so add the book to the user's favorites
        await fetch('/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookData)
        })
      } else {
        await fetch('/favorites', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
          })
      }
}
})
