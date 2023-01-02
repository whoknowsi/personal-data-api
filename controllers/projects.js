const router = require('express').Router()
const Deployment = require('../models/deployment')
const { checkAuthentication } = require('../utils/middlewares')

router.get('/', async (req, res) => {
  const deployments = await Deployment.find({})
  res.status(200).json(deployments)
})

router.post('/', checkAuthentication, async (req, res) => {
  const newDeployment = new Deployment({ ...req.body })

  try {
    const savedDeployment = await newDeployment.save()
    res.status(200).json(savedDeployment)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
