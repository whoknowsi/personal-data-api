const getRandomFromArray = (array) => array[Math.floor(Math.random() * array.length)]

const toCamelCase = (value) => value.replace(/([-_]\w)/g, returnLetterWithALeftScoreToUpperCase)
const returnLetterWithALeftScoreToUpperCase = (charWithScoreOnLeft) => charWithScoreOnLeft[1].toUpperCase()

const checkIfItIsADate = (toValidate) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])[/-](0[1-9]|1[0-2])[/-][0-9]{4}$/
  return (!toValidate || !toValidate.trim().length) || regex.test(toValidate)
}

const NormalizeDataIfNecessaryForMultipleData = (object) => {
  const modifiedObject = []

  for (const fieldName in object) {
    const field = object[fieldName]
    modifiedObject.push(normalizeDataIfNecessary(field, fieldName))
  }

  return modifiedObject
}

const normalizeDataIfNecessary = (field, fieldName) => {
  const modifiedField = JSON.parse(JSON.stringify(field))

  // eslint-disable-next-line no-prototype-builtins
  if (field.hasOwnProperty('validate')) {
    modifiedField.validate.validator = `(${fieldName}) => ${field.validate.validator.name}(${fieldName})`
  }

  const isArray = Array.isArray(modifiedField)
  return isArray
    ? { field: { type: [...modifiedField], fieldName } }
    : { field: { ...modifiedField, fieldName } }
}

const selectCorretDataBase = (environment) => {
  return environment === 'test'
    ? process.env.MONGO_TEST_DB_URI
    : process.env.MONGO_DB_URI
}

const toKebabCase = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

const parseId = (obj) => {
  const { _id, __v, ...rest } = JSON.parse(JSON.stringify(obj))
  return {
    ...rest,
    id: _id.toString()
  }
}

module.exports = {
  getRandomFromArray,
  toCamelCase,
  returnLetterWithALeftScoreToUpperCase,
  checkIfItIsADate,
  normalizeDataIfNecessary,
  NormalizeDataIfNecessaryForMultipleData,
  selectCorretDataBase,
  toKebabCase,
  parseId
}
