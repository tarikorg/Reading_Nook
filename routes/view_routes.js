const view_router = require('express').Router()

//Show homepage
view_router.get('/', (req,res) => {
    res.render('landing', {
        title: 'Home',
    })
})

//show login page
view_router.get('/login', (req,res) => {
    res.render('login', {
        title: 'Login',
    })
})

//show search page
view_router.get('/search', (req,res) => {
    res.render('search', {
        title: 'Search',
    })
})

//show favorites page
view_router.get('/favorites', (req,res) => {
    res.render('favorites', {
        title: 'Favorites',
    })
})

module.exports = view_router