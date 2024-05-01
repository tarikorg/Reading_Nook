const { Model, DataTypes } = require('sequelize')
const client = require('../db/Connection')
const bcrypt = require('bcrypt')

//id
//username
//password
//encrypt
//validating password

class User extends Model {
    //validatepassword
    validatePassword(password){
      return bcrypt.compareSync(password, this.password)  
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: 6
            },
            allowNull: false
        }
    },
    {
       sequelize: client,
       modelName: 'user',
       hooks: {
        beforeCreate: async (newData) => {
            newData.password = await bcrypt.hash(newData.password, 10)//encrypt the password at the creation
            return newData
        }
       },
       timestamps: false
       
    }
)

module.exports = User
//fav-id ??
//book-id ??