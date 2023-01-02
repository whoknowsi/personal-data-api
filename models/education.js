const mongoose = require('mongoose')
const education = require('../config/fields/education')

const educationSchema = new mongoose.Schema(education)

module.exports = mongoose.model('Education', educationSchema)
