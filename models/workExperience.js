const mongoose = require('mongoose')
const workExperience = require('../config/fields/workExperience')

const workExperienceScheme = new mongoose.Schema(workExperience)

module.exports = mongoose.model('WorkExperience', workExperienceScheme)
