const router = require('express').Router()
const Education = require('../models/education')
const { checkAuthentication } = require('../utils/middlewares')

router.get('/', async (req, res) => {
  const educations = await Education.find({})
  res.status(200).json({ educations: educations })
})

router.post('/', checkAuthentication, async (req, res) => {
  const newEducation = new Education({ ...req.body })

  try {
    const savedEducation = await newEducation.save()
    res.status(200).json({ education: savedEducation })
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
