require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const educationsRouter = require('./controllers/educations')
const certificatesRouter = require('./controllers/certificates')
const workExperience = require('./controllers/workExperience')
const authRouter = require('./controllers/auth')

const middlewares = require('./utils/middlewares')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Failed to connect to MongoDB', error))

const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(middlewares.tokenExtractor)

app.use('/api/educations', educationsRouter)
app.use('/api/certificates', certificatesRouter)
app.use('/api/work-experiences', workExperience)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})
