const CryptoJS = require('crypto-js')
const User = require('../models/user')
const { allInitialDataEn, allDataToCreateEn, allDataToUpdateEn } = require('./data_en_helpers')
const { allInitialDataEs, allDataToUpdateEs, allDataToCreateEs } = require('./data_es_helpers')

const createUser = async () => {
  const foundUser = await User.findOne({})
  if (foundUser) return

  const testPassword = 'testpassword'
  const passwordHash = CryptoJS.AES.encrypt(testPassword, process.env.SECRET_TOKEN).toString()
  const newUser = new User({
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

const fromCameCaseToSnakeCase = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

const allInitialData = {
  en: allInitialDataEn,
  es: allInitialDataEs
}

const allDataToCreate = {
  en: allDataToCreateEn,
  es: allDataToCreateEs
}

const allDataToUpdate = {
  en: allDataToUpdateEn,
  es: allDataToUpdateEs
}

module.exports = {
  createUser,
  getNonExistingId,
  fromCameCaseToSnakeCase,
  allInitialData,
  allDataToCreate,
  allDataToUpdate
}
