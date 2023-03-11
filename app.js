const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const serverless = require('serverless-http');

const middlewares = require('./utils/middlewares')

const fieldsRouter = require('./controllers/fields')
const authRouter = require('./controllers/auth')
const dataRouter = require('./controllers/dataRouter')
const endpointsRouter = require('./controllers/endpoints.js')
const basicInformationRouter = require('./controllers/basicInformation.js')

const { DB_URI } = require('./config/config')
const connectToDatabase = require('./db')

connectToDatabase(DB_URI)

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/static', express.static('public'))

app.use(middlewares.tokenExtractor)

app.use('/', endpointsRouter)
app.use('/:endpoint/fields', fieldsRouter)
app.use('/:endpoint/', dataRouter)
app.use('/basic-information', basicInformationRouter)
app.use('/auth', authRouter)

module.exports = app
module.exports.handler = serverless(app)