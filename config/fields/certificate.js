const { checkIfItIsADate } = require('../../utils/helpers')

const basicModel = {
  name: {
    type: 'String',
    required: true
  },
  description: {
    type: 'String',
    required: true
  },
  issuingOrganization: {
    type: 'String',
    required: true
  },
  expires: {
    type: 'Boolean',
    default: false
  },
  issueDate: {
    type: 'String',
    validate: {
      validator: checkIfItIsADate,
      message: 'Provided date is invalid'
    },
    required: true
  },
  expirationDate: {
    type: 'String',
    validate: {
      validator: checkIfItIsADate,
      message: 'Provided date is invalid'
    }
  },
  credentialId: {
    type: 'String'
  },
  credentialURL: {
    type: 'String'
  }
}

module.exports = {
  en: basicModel,
  es: basicModel
}
