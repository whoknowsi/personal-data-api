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
  },
  certificates: {
    name: {
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
      type: 'Date',
      required: true
    },
    expirationDate: {
      type: 'Date'
    },
    credentialId: {
      type: 'String'
    },
    credentialURL: {
      type: 'String'
    }
  },
  educations: {
    school: {
      type: 'String',
      required: true
    },
    degree: {
      type: 'String',
      enum: [
        'Bachelor',
        'Master',
        'Engineer',
        'High school',
        'Technical',
        'Doctor'
      ],
      required: true
    },
    fieldOfStudy: {
      type: 'String',
      required: true
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
    media: {
      type: 'Array'
    }
  },
  users: {
    username: {
      type: 'String',
      required: true
    },
    password: {
      type: 'String',
      required: true
    }
  },
  workExperiences: {
    company: {
      type: 'String',
      required: true
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
          type: 'String',
          required: true
        },
        country: {
          type: 'String',
          required: true
        },
        workType: {
          type: 'String',
          enum: [
            'On-site',
            'Hybrid',
            'Remote'
          ],
          required: true
        }
      },
      required: true
    },
    startDate: {
      type: 'Date',
      required: true
    },
    endDate: {
      type: 'Date'
    },
    responsabilities: {
      type: 'Array',
      required: true
    }
  }
}

module.exports = fields
