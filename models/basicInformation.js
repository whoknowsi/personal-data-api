const mongoose = require('mongoose')
const basicInformation = require('../config/fields/basicInformation')

const basicInformationSchema = new mongoose.Schema(basicInformation)

module.exports = mongoose.model('BasicInformation', basicInformationSchema)
