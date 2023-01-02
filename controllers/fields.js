const router = require('express').Router({ mergeParams: true })
const fields = require('../config/fields')

const toCamelCase = (value) => value.replace(/([-_]\w)/g, (m) => m[1].toUpperCase())

router.get('/', async (req, res) => {
  const endpoint = toCamelCase(req.params.endpoint)

  const foundedEndpoint = fields[endpoint]
  if (!foundedEndpoint) return res.status(404).json({ message: 'Endpoint not found' })

  res.status(200).json(foundedEndpoint)
})

router.get('/:field', async (req, res) => {
  const endpoint = toCamelCase(req.params.endpoint)
  const field = toCamelCase(req.params.field)

  const foundedEndpoint = fields[endpoint]
  if (!foundedEndpoint) return res.status(404).json({ message: 'Field not found' })

  const foundedField = foundedEndpoint[field]
  if (!foundedField) return res.status(404).json({ message: 'Field not found' })

  res.status(200).json({ field: { ...foundedField, fieldName: field } })
})

module.exports = router
