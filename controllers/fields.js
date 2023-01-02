const router = require('express').Router({ mergeParams: true })
const fields = require('../config/fields')

router.get('/', async (req, res) => {
  const endpoint = req.params.endpoint

  const foundedEndpoint = fields[endpoint]
  if (!foundedEndpoint) return res.status(404).json({ message: 'Endpoint not found' })

  res.status(200).json(foundedEndpoint)
})

router.get('/:field', async (req, res) => {
  const endpoint = req.params.endpoint
  const field = req.params.field

  const foundedEndpoint = fields[endpoint]
  if (!foundedEndpoint) return res.status(404).json({ message: 'Field not found' })

  const foundedField = foundedEndpoint[field]
  if (!foundedField) return res.status(404).json({ message: 'Field not found' })

  res.status(200).json({ field: { ...foundedField, fieldName: field } })
})

module.exports = router
