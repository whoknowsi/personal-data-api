const router = require('express').Router()
const Certificate = require('../models/certificate')
const { checkAuthentication } = require('../utils/middlewares')

router.get('/', async (req, res) => {
  const certificates = await Certificate.find({})
  res.status(200).json({ certificates: certificates })
})

router.post('/', checkAuthentication, async (req, res) => {
  const newCertificate = new Certificate({ ...req.body })

  try {
    const savedCertificate = await newCertificate.save()
    res.status(200).json({ certificate: savedCertificate })
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
