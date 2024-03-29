const app = require('../functions/api')
const supertest = require('supertest')
const mongoose = require('mongoose')
const { BASE_API_URL } = require('../config/config')
const api = supertest(app)

test('return 401 if user token is malformed', async () => {
  const result = await api
    .post(BASE_API_URL + '/certificates/')
    .set('Authorization', 'Bearer fakeToken')
    .expect(401)

  expect(result.body.error.name).toBe('JsonWebTokenError')
})

test('return 401 if user token is invalid', async () => {
  const result = await api
    .post(BASE_API_URL + '/certificates/')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcnNvbmEtZGF0YS1hcGkiLCJpYXQiOjE2NzI3MDc1NjF9.eFwkkJOPwkJg33usfxat6mV_gi_xOrURaJd8LnIUEYE')
    .expect(401)

  expect(result.body.error).toBe('Unauthorized - You do not have permission to perform this action.')
})

afterAll(() => mongoose.connection.close())
