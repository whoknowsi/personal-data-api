const mongoose = require('mongoose')

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  issuingOrganization: {
    type: String,
    require: true
  },
  expires: {
    type: Boolean,
    default: false
  },
  issueDate: {
    type: Date,
    require: true
  },
  expirationDate: {
    type: Date
  },
  credentialId: {
    type: String
  },
  credentialURL: {
    type: String
  }
})

module.exports = mongoose.model('Certificate', certificateSchema)
