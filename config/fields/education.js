const { checkIfItIsADate } = require('../../utils/helpers')

const basicModel = {
  school: {
    type: 'String',
    required: true
  },
  degree: {
    type: 'String',
    enum: [
      "Bachelor's degree",
      "Master's degree",
      'Doctorate degree',
      "Associate's degree",
      'Technical degree',
      'Technical diploma',
      'Professional certification',
      'High school diploma',
      'Baccalaureate diploma',
      'Licenciatura',
      'Maestría',
      'Doctorado',
      'Posgrado',
      'Tecnicatura'
    ],
    required: true
  },
  fieldOfStudy: {
    type: 'String'
  },
  startDate: {
    type: 'String',
    validate: {
      validator: checkIfItIsADate,
      message: 'Provided date is invalid'
    },
    required: true
  },
  endDate: {
    type: 'String',
    validate: {
      validator: checkIfItIsADate,
      message: 'Provided date is invalid'
    }
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

module.exports = {
  en: basicModel,
  es: basicModel
}
