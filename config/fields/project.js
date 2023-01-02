module.exports = {
  name: {
    type: 'String',
    required: true
  },
  description: {
    type: 'String',
    required: true
  },
  createdAt: {
    type: 'Date',
    required: true
  },
  status: {
    type: 'String',
    enum: [
      'Completed',
      'In progress',
      'Pending',
      'Delayed',
      'On hold',
      'Abandoned'
    ],
    require: true
  },
  deployed: {
    type: 'Boolean',
    default: false
  },
  repoUrl: {
    type: 'String'
  },
  url: {
    type: 'String'
  },
  media: [
    {
    type: 'String'
    }
  ],
  client: {
    type: 'String',
    required: true
  }
}
