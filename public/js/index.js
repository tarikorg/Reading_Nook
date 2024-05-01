const favButton = document.querySelector('#searchResults')

favButton.addEventListener('change', (e)=>{
if(e.target.classList.contains('form-checkbox')){
    console.log('WORKS')
    
}
})
