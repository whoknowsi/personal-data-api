module.exports = {
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
