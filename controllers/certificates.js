const router = require('express').Router()
const Certificate = require('../models/certificate')

router.get('/', async (req, res) => {
  const certificates = await Certificate.find({})
  res.status(200).json(certificates)
})

module.exports = router
