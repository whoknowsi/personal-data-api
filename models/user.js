const mongoose = require('mongoose')
const { users } = require('../config/fields')

const userSchema = new mongoose.Schema(users)

module.exports = mongoose.model('User', userSchema)
