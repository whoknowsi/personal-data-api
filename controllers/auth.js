const router = require('express').Router()
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const foundUser = await User.findOne({ username })
  if (!foundUser) return res.status(401).json({ error: 'invalid username or password' })

  const decryptedPassword = crypto.AES.decrypt(foundUser.password, process.env.SECRET_TOKEN).toString()
  const correctPassword = decryptedPassword === password
  if (!correctPassword) return res.status(401).json({ error: 'invalid username or password' })

  const token = jwt.sign({ id: foundUser.id, username: foundUser.username }, process.env.SECRET_TOKEN, { expiresIn: '7d' })
  res.status(200).json({ token })
})

router.post('/register', async (req, res) => {
  const foundUsers = await User.find({})
  if (foundUsers.length > 0) return res.status(401).json({ error: 'Unauthorized to create account' })

  const { username, password } = req.body

  const passwordHash = crypto.AES.encrypt(password, process.env.SECRET_TOKEN).toString()

  const newUser = new User({
    username,
    password: passwordHash
  })

  const savedUser = await newUser.save()
  res.status(200).json(savedUser)
})

module.exports = router
