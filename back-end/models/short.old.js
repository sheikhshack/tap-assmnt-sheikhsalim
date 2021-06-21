const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const shortSchema = mongoose.Schema({
    shortenedURL: {type: String, unique: true},
    actualURL: {type: String}
})

shortSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Short', shortSchema)