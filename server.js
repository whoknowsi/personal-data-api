const app = require('./app')
const { PORT } = require('./config/config')

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})