const view_router = require('express').Router()

function isAuth(req,res,next){
    if(!req.session.user_id){
        return res.redirect('/register')
    }

    next()
}

//Show homepage
view_router.get('/', (req,res) => {
    res.render('landing', {
        title: 'Home',
        btn1: 'Login',
        href1: '/login',
        btn2: 'Register',
        href2: '/register'
    })
})

//show register page
view_router.get('/register', (req,res) => {
    res.render('register', {
        title: 'Register',
        btn1: 'Login',
        href1: '/login',
        btn2: 'Home',
        href2: '/'
    })
})

//show register page
view_router.get('/register/:error', (req,res) => {
    const error = req.params.error
    res.render('register', {
        title: 'Register',
        error: error,
        class: 'p-2 bg-red-300 rounded-md',
        btn1: 'Login',
        href1: '/login',
        btn2: 'Home',
        href2: '/'
    })
})

//show login page
view_router.get('/login', (req,res) => {
    res.render('login', {
        title: 'Login',
        btn1: 'Home',
        href1: '/',
        btn2: 'Register',
        href2: '/register'
    })
})

//show login page
view_router.get('/login/:error', (req,res) => {
    const error = req.params.error
    res.render('login', {
        title: 'Login',
        error: error,
        class: 'p-2 bg-red-300 rounded-md',
        btn1: 'Home',
        href1: '/',
        btn2: 'Register',
        href2: '/register'
    })
})

//show search page
view_router.get('/search', /*isAuth,*/ (req,res) => {
    res.render('search', {
        title: 'Search',
        btn1: 'Favorites',
        href1: '/favorites',
        btn2: 'Logout',
        href2: '/logout'
    })
})

//show favorites page
view_router.get('/favorites', /*isAuth,*/ (req,res) => {
    res.render('favorites', {
        title: 'Favorites',
        btn1: 'Search',
        href1: '/search',
        btn2: 'Logout',
        href2: '/logout'
    })
})

view_router.get('/logout', isAuth, (req,res) => {
    req.session.user_id = null
    res.render('landing', {
        title: 'Home',
        btn1: 'Login',
        href1: '/login',
        btn2: 'Register',
        href2: '/register'
    })
})

module.exports = view_router