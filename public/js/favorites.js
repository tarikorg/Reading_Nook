//target delete button 
const deleteButton = document.querySelector('#favorite-books')



//event listener when clicked on delete
if (deleteButton) {
    deleteButton.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-button')) {
            const bookElementId = e.target.closest('.book').dataset.id  //  datasetId 
            const deleteHtml = e.target.closest('.book')

            // DELETE HTML
            deleteHtml.remove()

            //target the data-id="{{id}}" and call(fetch) the DELETE route 
            const bookData = {
                api_id: bookElementId
            }

            try {
              
                await fetch('/favorites', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookData)  //api_id
                })

                if (!deleteButton.children.length) {
                    window.location.reload()
                }
            } catch (error) {
                console.log(error)
            }

        }
    })
}

