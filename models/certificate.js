const mongoose = require('mongoose')

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  issuingOrganization: {
    type: String,
    required: true
  },
  expires: {
    type: Boolean,
    default: false
  },
  issueDate: {
    type: Date,
    required: true
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
