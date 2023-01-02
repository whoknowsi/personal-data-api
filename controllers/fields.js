const router = require('express').Router({ mergeParams: true })
const fields = require('../config/fields')
const { toCamelCase } = require('../utils/helpers')

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

  const isArray = Array.isArray(foundedField)

  const fieldToSend = isArray 
    ? { field: { type: [...foundedField], fieldName: field } }
    : { field: { ...foundedField, fieldName: field } }

  res.status(200).json(fieldToSend)
})

module.exports = router
