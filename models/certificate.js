const mongoose = require('mongoose')
const { certificates } = require('../config/fields')

const certificateSchema = new mongoose.Schema(certificates)

module.exports = mongoose.model('Certificate', certificateSchema)
