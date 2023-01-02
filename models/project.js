const mongoose = require('mongoose')
const { projects } = require('../config/fields')

const projectSchema = new mongoose.Schema(projects)

module.exports = mongoose.model('Project', projectSchema)
