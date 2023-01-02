const mongoose = require('mongoose')
const { workExperiences } = require('../config/fields')

const workExperienceScheme = new mongoose.Schema(workExperiences)

module.exports = mongoose.model('WorkExperience', workExperienceScheme)
