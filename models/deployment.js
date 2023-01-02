const mongoose = require('mongoose')
const deployment = require('../config/fields/deployment')

const deploymentSchema = new mongoose.Schema(deployment)

module.exports = mongoose.model('Deployment', deploymentSchema)
