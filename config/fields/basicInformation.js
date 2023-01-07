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
  nickName: {
    type: 'String',
    required: true
  },
  description: [
    {
      type: 'String'
    }
  ],
  dateOfBirth: {
    type: 'String',
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
    countryCode: {
      type: 'Number',
      required: true
    },
    areaCode: {
      type: 'Number',
      required: true
    },
    number: {
      type: 'Number',
      required: true
    }
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
      lenguage: {
        type: 'String',
        required: true
      },
      level: {
        type: 'String',
        required: true
      }
    }
  ],
  CV: {
    type: 'String',
    required: true
  }
}
