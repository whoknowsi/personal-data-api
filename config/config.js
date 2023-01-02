require('dotenv').config()

const PORT = process.env.PORT
let DB_URI = process.env.MONGO_DB_URI

if (process.env.NODE_ENV === 'test') {
  DB_URI = process.env.MONGO_TEST_DB_URI
}

module.exports = {
  PORT,
  DB_URI
}
