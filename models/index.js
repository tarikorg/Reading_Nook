const Favorite = require('./Favorite.js')
const User = require('./User.js')

User.hasMany(Favorite)
Favorite.belongsTo(User)


module.exports = { Favorite, User }