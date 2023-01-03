const { checkIfItIsADate } = require('../../utils/helpers')

module.exports = {
  name: {
    type: 'String',
    required: true
  },
  description: {
    type: 'String',
    required: true
  },
  repoUrl: {
    type: 'String'
  },
  url: {
    type: 'String',
    required: true
  },
  deployedAt: {
    type: 'String',
    validate: {
      validator: checkIfItIsADate,
      message: 'Provided date is invalid'
    }
  }
}
