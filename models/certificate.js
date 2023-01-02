const mongoose = require('mongoose')
const certificate = require('../config/fields/certificate')

const certificateSchema = new mongoose.Schema(certificate)

module.exports = mongoose.model('Certificate', certificateSchema)
