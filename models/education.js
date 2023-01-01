const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    require: true
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
    require: true
  },
  fieldOfStudy: {
    type: String,
    require: true
  },
  startDate: {
    type: Date,
    require: true
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
        require: true
      },
      country: {
        type: String,
        require: true
      }
    }
  },
  media: {
    type: Array
  }
})

module.exports = mongoose.model('Education', educationSchema)
