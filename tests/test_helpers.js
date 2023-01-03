const bcrypt = require('bcrypt')
const User = require('../models/user')

const createUser = async () => {
  const foundUser = await User.findOne({})
  if (foundUser) return

  const passwordHash = await bcrypt.hash('testpassword', 10)
  const newUser = new User ({
    username: 'testusername',
    password: passwordHash
  })

  await newUser.save()
}

const getNonExistingId = async (toSave) => {
  await toSave.save()
	await toSave.remove()

	return toSave._id.valueOf()
}

module.exports = {
  createUser,
  getNonExistingId
}