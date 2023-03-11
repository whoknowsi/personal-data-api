const router = require('express').Router({ mergeParams: true })
const dataModels = require('../models/dataModels')
const { toKebabCase } = require('../utils/helpers')

router.get('/', async (req, res) => {
  const dataEndpoints = Object.keys(dataModels).map((endpoint) => ({
    endpoint: `${process.env.BASE_PATH}/${toKebabCase(endpoint)}`
  }
  ))
  res.status(200).json([
    ...dataEndpoints,
    {
      endpoint: process.env.BASE_PATH + '/basic-information'
    }
  ])
})

module.exports = router
