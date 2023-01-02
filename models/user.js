const mongoose = require('mongoose')
const user = require('../config/fields/user')

const userSchema = new mongoose.Schema(user)

module.exports = mongoose.model('User', userSchema)
