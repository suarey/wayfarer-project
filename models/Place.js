const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  placeSchema = new mongoose.Schema({
    name: String,
    city: String,
  })




  const User = mongoose.model('Place', placeSchema)
module.exports = Place