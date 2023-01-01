const router = require('express').Router()
const Education = require('../models/education')

router.get('/', async (req, res) => {
  const educations = await Education.find({})
  res.status(200).json(educations)
})

router.post('/', async (req, res) => {
  const { school, degree, fieldOfStudy, startDate, endDate, grade, description, location, media } = req.body
  const newEducation = new Education({
    school,
    degree: degree.charAt(0).toUpperCase() + degree.slice(1).toLowerCase(),
    fieldOfStudy,
    startDate,
    endDate,
    grade,
    description,
    location,
    media
  })

  try {
    const savedEducation = await newEducation.save()
    res.status(200).json(savedEducation)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
