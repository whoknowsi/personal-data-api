const mongoose = require('mongoose')
const { deployments } = require('../config/fields')

const deploymentSchema = new mongoose.Schema(deployments)

module.exports = mongoose.model('Deployment', deploymentSchema)
