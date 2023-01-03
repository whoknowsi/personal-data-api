require('dotenv').config()

const PORT = process.env.PORT
const DB_URI = process.env.NODE_ENV === 'test'
  ? process.env.MONGO_TEST_DB_URI
  : process.env.MONGO_DB_URI

module.exports = {
  PORT,
  DB_URI
}
