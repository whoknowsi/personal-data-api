require('dotenv').config()
const { selectCorretDataBase } = require('../utils/helpers')

const PORT = process.env.PORT
const DB_URI = selectCorretDataBase(process.env.NODE_ENV)
const BASE_API_URL = '/.netlify/functions/api'

module.exports = {
  PORT,
  DB_URI,
  BASE_API_URL
}
