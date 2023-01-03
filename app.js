const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const middlewares = require('./utils/middlewares')

const educationsRouter = require('./controllers/educations')
const certificatesRouter = require('./controllers/certificates')
const workExperiencesRouter = require('./controllers/workExperiences')
const deploymentsRouter = require('./controllers/deployments')
const projectsRouter = require('./controllers/projects')
const fieldsRouter = require('./controllers/fields')
const authRouter = require('./controllers/auth')

const { DB_URI } = require('./config/config')
const connectToDatabase = require('./db')

connectToDatabase(DB_URI)

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(middlewares.tokenExtractor)

app.use('/api/:endpoint/fields', fieldsRouter)
app.use('/api/educations', educationsRouter)
app.use('/api/certificates', certificatesRouter)
app.use('/api/work-experiences', workExperiencesRouter)
app.use('/api/deployments', deploymentsRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/auth', authRouter)

module.exports = app
