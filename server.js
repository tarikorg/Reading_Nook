const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')

require('dotenv').config()
const client = require('./db/Connection')

const app = express()
const PORT = process.env.PORT || 3000

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const routes = require('./routes') // Require the routes

//setup Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: client,
    }),
    //cookie: { secure: true }
}))

app.use('/', routes)

client.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => console.log('Listening on port:', PORT))
    }
)