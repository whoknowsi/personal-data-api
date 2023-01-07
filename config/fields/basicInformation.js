const { checkIfItIsADate } = require('../../utils/helpers')

module.exports = {
  name: {
    type: 'String',
    required: true
  },
  lastName: {
    type: 'String',
    required: true
  },
  description: [
    {
      type: 'String'
    }
  ],
  dateOfBirth: {
    type: 'Date',
    validate: {
      validator: checkIfItIsADate,
      message: 'Provided date is invalid'
    },
    required: true
  },
  country: {
    type: 'String',
    required: true
  },
  city: {
    type: 'String',
    required: true
  },
  phone: {
    type: 'Number',
    required: true
  },
  email: {
    type: 'String',
    required: true
  },
  socialMedia: [
    {
      type: 'String'
    }
  ],
  skills: [
    {
      type: 'String'
    }
  ],
  lenguages: [
    {
      type: 'String'
    }
  ],
  CV: {
    type: 'String',
    required: true
  }
}
