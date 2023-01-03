const router = require('express').Router({ mergeParams: true })
const fields = require('../config/fields')
const { toCamelCase, normalizeDataIfNecessary, NormalizeDataIfNecessaryForMultipleData } = require('../utils/helpers')

router.get('/', async (req, res) => {
  const endpoint = toCamelCase(req.params.endpoint)

  const foundedFields = fields[endpoint]
  if (!foundedFields) return res.status(404).json({ message: 'Endpoint not found' })

  res.status(200).json({ fields: NormalizeDataIfNecessaryForMultipleData(foundedFields) })
})

router.get('/:field', async (req, res) => {
  const endpoint = toCamelCase(req.params.endpoint)
  const field = toCamelCase(req.params.field)

  const foundedFields = fields[endpoint]
  if (!foundedFields) return res.status(404).json({ message: 'Field not found' })

  const foundedField = foundedFields[field]
  if (!foundedField) return res.status(404).json({ message: 'Field not found' })

  res.status(200).json(normalizeDataIfNecessary(foundedField, field))
})

module.exports = router
