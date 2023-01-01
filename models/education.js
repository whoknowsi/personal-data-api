const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    enum: [
      'Bachelor',
      'Master',
      'Engineer',
      'High school',
      'Technical',
      'Doctor'
    ],
    required: true
  },
  fieldOfStudy: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  grade: {
    type: Number
  },
  description: {
    type: String
  },
  location: {
    type: {
      city: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },
    required: true
  },
  media: {
    type: Array
  }
})

module.exports = mongoose.model('Education', educationSchema)
