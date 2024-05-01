const { Model, DataTypes } = require('sequelize')
const client = require('../db/Connection')


class Favorite extends Model {

}
//id
//books-id
//user-id

Favorite.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title:{
        type: DataTypes.STRING,
        allowNull: false,

      }
      },
      {
       sequelize: client,
       timestamps: false,
       modelName: 'favorite'
      }
)

module.exports = Favorite;