const http = require('http')
const app = require('./functions/api')
const { PORT } = require('./config/config')

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})
