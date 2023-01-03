require('dotenv').config()
const { selectCorretDataBase } = require('../utils/helpers')

const PORT = process.env.PORT
const DB_URI = selectCorretDataBase(process.env.NODE_ENV)

module.exports = {
  PORT,
  DB_URI
}
