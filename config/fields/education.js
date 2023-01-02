module.exports = {
  school: {
    type: 'String',
    required: true
  },
  degree: {
    type: 'String',
    enum: [
      "Bachelor's degree",
      "Master's degree",
      "Doctorate degree",
      "Associate's degree",
      "Technical degree",
      "Technical diploma",
      "Professional certification",
      "High school diploma",
      "Baccalaureate diploma"
    ],
    required: true
  },
  fieldOfStudy: {
    type: 'String'
  },
  startDate: {
    type: 'Date',
    required: true
  },
  endDate: {
    type: 'Date'
  },
  grade: {
    type: 'Number'
  },
  description: {
    type: 'String'
  },
  location: {
    type: {
      city: {
        type: 'String',
        required: true
      },
      country: {
        type: 'String',
        required: true
      }
    },
    required: true
  },
  media: [
    {
      type: 'String'
    }
  ]
}
