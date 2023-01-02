const bcrypt = require('bcrypt')
const User = require('../models/user')

const createUser = async () => {
  const passwordHash = await bcrypt.hash('testpassword', 10)
  const newUser = new User ({
    username: 'testusername',
    password: passwordHash
  })

  await newUser.save()
}

module.exports = {
  createUser
}