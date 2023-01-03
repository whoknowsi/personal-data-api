const { selectCorretDataBase } = require('../utils/helpers')

test('If environment is not test, then database URI is mongodb production URI', async () => {
  const result = selectCorretDataBase('production')
  expect(result).toBe(process.env.MONGO_DB_URI)
})
