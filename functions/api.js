const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const serverless = require('serverless-http')
const router = express.Router()

const middlewares = require('../utils/middlewares')

const fieldsRouter = require('../controllers/fields')
const authRouter = require('../controllers/auth')
const dataRouter = require('../controllers/dataRouter')
const endpointsRouter = require('../controllers/endpoints.js')
const basicInformationRouter = require('../controllers/basicInformation.js')

const { DB_URI, BASE_API_URL } = require('../config/config')
const connectToDatabase = require('../db')

connectToDatabase(DB_URI)

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

router.use('/auth', authRouter)
router.use('/', endpointsRouter)

app.use(middlewares.tokenExtractor)

router.use('/:endpoint/fields', fieldsRouter)
router.use('/:endpoint/', dataRouter)
router.use('/basic-information', basicInformationRouter)

app.use(BASE_API_URL, router)
module.exports.handler = serverless(app)
process.env.NODE_ENV === 'development' && (module.exports = app)
process.env.NODE_ENV === 'test' && (module.exports = app)
