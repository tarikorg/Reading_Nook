// const express = require ('express')
// const {engine} = require('express-handlebars')

// const app = express()
// const PORT = 3000

//const routes = require('./routes')

//import new sequelize client
//const client = require('./db/Connection)

//setup Handlebars
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');

//app.use('/', routes)

// client.sync({force: false})
// .then(() =>{
//     app.listen(PORT, () => console.log('Listening on port:', PORT))
// }
// )


const express = require('express');
const {engine} = require('express-handlebars')

require('dotenv').config()
const client = require('./db/Connection')

const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes'); // Require the routes

//setup Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use('/', routes)

client.sync({force: false})
.then(() =>{
    app.listen(PORT, () => console.log('Listening on port:', PORT))
}
)