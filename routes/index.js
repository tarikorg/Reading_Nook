//combine routes and export to server.js
const router = require('express').Router()

const search_routes = require('./search_routes')
const view_routes = require('./view_routes')
const auth_routes = require('./auth_routes')

//load routes at root
router.use('/', [search_routes, view_routes, auth_routes])

module.exports = router