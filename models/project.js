const mongoose = require('mongoose')
const project = require('../config/fields/project')

const projectSchema = new mongoose.Schema(project)

module.exports = mongoose.model('Project', projectSchema)
