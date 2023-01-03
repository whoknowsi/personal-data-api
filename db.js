const mongoose = require('mongoose')

const connectToDatabase = async (DB_URI) => {
  mongoose.set('strictQuery', false)
  return await mongoose.connect(DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Failed to connect to MongoDB', error))
}

module.exports = connectToDatabase
