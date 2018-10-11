const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const placeSchema = new mongoose.Schema({
    city: String,
    country: String,
    image: String,
    posts: [postSchema]
})


const Place = mongoose.model('Place', placeSchema)

module.exports = Place
