const fields = {
  deployments: {
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
  },
  projects: {
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
    media: {
      type: 'Array'
    },
    client: {
      type: 'String',
      required: true
    }
  }

}

module.exports = fields
