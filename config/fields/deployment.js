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
    type: 'Date'
  }
}
