const router = require('express').Router()
const WorkExperience = require('../models/workExperience')
const { checkAuthentication } = require('../utils/middlewares')

router.get('/', async (req, res) => {
  const workExperiences = await WorkExperience.find({})
  res.status(200).json(workExperiences)
})

router.post('/', checkAuthentication, async (req, res) => {
  const newWorkExperience = new WorkExperience({ ...req.body })

  try {
    const savedExperience = await newWorkExperience.save()
    res.status(200).json(savedExperience)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
