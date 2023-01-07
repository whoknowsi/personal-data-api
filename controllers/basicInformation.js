const router = require('express').Router()
const BasicInformation = require('../models/basicInformation')
const { checkAuthentication } = require('../utils/middlewares')

router.get('/', async (req, res, next) => {
  const result = await BasicInformation.findOne({})
  res.status(200).json({ result, status: 200 })
})

router.post('/', checkAuthentication, async (req, res, next) => {
  const foundBasicInformation = await BasicInformation.findOne({})
  if (foundBasicInformation) return res.status(400).json({ message: 'Basic information data already exists' })

  const newBasicInformation = new BasicInformation({ ...req.body })

  try {
    const savedBasicInformation = await newBasicInformation.save()
    res.status(201).json({ result: savedBasicInformation, status: 201 })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put('/', checkAuthentication, async (req, res, next) => {
  try {
    const foundResult = await BasicInformation.findOne({})
    if (!foundResult) return res.status(404).json({ message: 'Basic information not found' })

    const updatedData = await BasicInformation.findOneAndUpdate({ ...req.body }, { new: true, runValidators: true })
    res.status(200).json({ result: updatedData })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete('/', checkAuthentication, async (req, res, next) => {
  try {
    const deletedData = await BasicInformation.deleteMany({})
    res.status(200).json({ result: deletedData })
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
