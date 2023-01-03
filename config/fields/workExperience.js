const { checkIfItIsADate } = require('../../utils/helpers')

module.exports = {
  company: {
    type: 'String'
  },
  title: {
    type: 'String',
    required: true
  },
  employmentType: {
    type: 'String',
    enum: [
      'Full-time',
      'Part-time',
      'Self-employed',
      'Freelance',
      'Contract',
      'Internship',
      'Apprenticeship',
      'Seasonal'
    ],
    required: true
  },
  location: {
    type: {
      city: {
        type: 'String'
      },
      country: {
        type: 'String'
      }
    }
  },
  locationType: {
    type: 'String',
    enum: [
      'On-site',
      'Hybrid',
      'Remote'
    ],
    required: true
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
  responsabilities: [
    {
      type: 'String'
    }
  ],
  skills: [
    {
      type: 'String'
    }
  ]
}
