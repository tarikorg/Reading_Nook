const auth_router = require('express').Router()
const { User } = require('../models')

//handles errors
function handleValidationError(err, res) {
    console.log(err)

    const errors = err.errors.map(eObj => {
        return {
            message: eObj.message
        }
    })

    let error = errors[0].message

    if (error == 'Validation len on password failed') {
        error = 'Password must have 6 or more characters'
    } else {
        error = 'Username must be unique'
    }

    res.redirect(`/register/${error}`)
}

//register user
auth_router.post('/auth/register', async (req, res) => {
    try {
        const data = req.body

        const user = await User.create(data) //creates insert statement for you

        //store info to server, so we have active record of user data
        //allows us to know when they return if their data is active then they are logged in (auth)
        req.session.user_id = user.id

        res.redirect('/search')

    } catch (err) {
        handleValidationError(err, res)
        //redirect user back to register page
        //res.redirect('/register')
    }
})

auth_router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({
        where: {
            username: username
        }
    })

    if (!user) return res.redirect('/register')

    const valid_pass = await user.validatePassword(password)

    if (!valid_pass) return res.redirect('/login/Invalid Password')

    req.session.user_id = user.id
    res.redirect('/search')
})

module.exports = auth_router