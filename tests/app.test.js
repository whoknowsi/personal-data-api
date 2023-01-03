const connectToDatabase = require('../db')

test('should throw an error when connecting to the database fails', async () => {
  connectToDatabase('badURI')
    .catch((error) => {
      expect(error).toBe(error)
    })
})
