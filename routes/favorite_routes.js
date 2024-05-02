const express = require('express')
const router = express.Router()

const { Favorite } = require('../models')

//SEARCH HANDLEBARS
// Route to add favorite book

router.post('/favorites', async (req, res) => {
    try {
        const bookInfo = req.body
        const checkbook = await Favorite.findOne({
            where: {
                api_id: bookInfo.api_id
            }
        })

        console.log(checkbook)

        if (!checkbook) {
            await Favorite.create({
                ...bookInfo,
                userId: req.session.user_id
            })
        }
    } catch (err) {
        console.log(err)
    }
})

router.delete('/favorites', async (req, res) => {
    try {
        const bookInfo = req.body
        await Favorite.destroy({
            where: {
                api_id: bookInfo.api_id,
                userId: req.session.user_id
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//FAVORITE HANDLEBARS 


module.exports = router