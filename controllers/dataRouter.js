const router = require('express').Router({ mergeParams: true })
const dataModels = require('../models/dataModels')
const { toCamelCase } = require('../utils/helpers')
const { checkAuthentication } = require('../utils/middlewares')

router.get('/', async (req, res, next) => {
  const endpoint = toCamelCase(req.params.endpoint?.toLowerCase())
  const DataModel = dataModels[endpoint]

  if (!DataModel) return next()

  const results = await DataModel.find({})
  res.status(200).json({ results, status: 200 })
})

router.get('/:id', async (req, res, next) => {
  const endpoint = toCamelCase(req.params.endpoint?.toLowerCase())
  const DataModel = dataModels[endpoint]
  const id = req.params.id

  if (!DataModel) return next()

  try {
    const foundResult = await DataModel.findById(id)
    foundResult
      ? res.status(200).json({ result: foundResult })
      : res.status(404).json({ message: `${DataModel.collection.modelName} not found` })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/', checkAuthentication, async (req, res, next) => {
  const endpoint = toCamelCase(req.params.endpoint?.toLowerCase())
  const DataModel = dataModels[endpoint]

  if (!DataModel) return next()

  const newCertificate = new DataModel({ ...req.body })

  try {
    const savedData = await newCertificate.save()
    res.status(201).json({ result: savedData, status: 201 })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put('/:id', checkAuthentication, async (req, res, next) => {
  const endpoint = toCamelCase(req.params.endpoint?.toLowerCase())
  const DataModel = dataModels[endpoint]
  const id = req.params.id
  const toUpdate = req.body

  if (!DataModel) return next()

  try {
    const foundResult = await DataModel.findById(id)
    if (!foundResult) return res.status(404).json({ message: `${DataModel.collection.modelName} not found` })

    const updatedData = await DataModel.findByIdAndUpdate(id, toUpdate, { new: true, runValidators: true })
    res.status(200).json({ result: updatedData })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete('/:id', checkAuthentication, async (req, res, next) => {
  const endpoint = toCamelCase(req.params.endpoint?.toLowerCase())
  const DataModel = dataModels[endpoint]
  const id = req.params.id

  if (!DataModel) return next()

  try {
    const deletedData = await DataModel.findByIdAndDelete(id)
    res.status(200).json({ result: deletedData })
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
