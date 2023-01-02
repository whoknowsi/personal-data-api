const router = require('express').Router()
const Project = require('../models/project')
const { checkAuthentication } = require('../utils/middlewares')

router.get('/', async (req, res) => {
  const projects = await Project.find({})
  res.status(200).json(projects)
})

router.post('/', checkAuthentication, async (req, res) => {
  const newProject = new Project({ ...req.body })

  try {
    const savedProject = await newProject.save()
    res.status(200).json(savedProject)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
