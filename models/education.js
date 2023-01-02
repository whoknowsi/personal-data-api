const mongoose = require('mongoose')
const { educations } = require('../config/fields')

const educationSchema = new mongoose.Schema(educations)

module.exports = mongoose.model('Education', educationSchema)
