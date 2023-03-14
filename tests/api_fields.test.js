const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../functions/api')
const api = supertest(app)
const fields = require('../config/fields')
const { getRandomFromArray, toCamelCase, normalizeDataIfNecessary, NormalizeDataIfNecessaryForMultipleData } = require('../utils/helpers')
const { BASE_API_URL } = require('../config/config')

const posibleEndpoints = [
  'certificates',
  'deployments',
  'educations',
  'projects',
  'work-experiences'
]

describe('/:endpoint/fields', () => {
  test('can get all fields of a endpoint', async () => {
    const randomEndpoint = toCamelCase(getRandomFromArray(posibleEndpoints))
    const url = BASE_API_URL + `/${randomEndpoint}/fields`

    const result = await api
      .get(url)
      .expect(200)

    expect(result.body.fields).toEqual(NormalizeDataIfNecessaryForMultipleData(fields[randomEndpoint]))
  })

  test('return 404 if endpoint provided does not exist', async () => {
    const badEndpoint = 'badEndpoint'
    const url = BASE_API_URL + `/${badEndpoint}/fields`

    await api
      .get(url)
      .expect(404)
  })

  describe('/:field', () => {
    test('return the correct field details if exists', async () => {
      const randomEndpoint = toCamelCase(getRandomFromArray(posibleEndpoints))
      const randomField = getRandomFromArray(Object.keys(fields[randomEndpoint]))
      const url = BASE_API_URL + `/${randomEndpoint}/fields/${randomField}`

      const field = fields[randomEndpoint][randomField]

      const result = await api
        .get(url)
        .expect(200)

      expect(result.body).toEqual(normalizeDataIfNecessary(field, randomField))
    })

    test('return 404 if the field provided does not exist', async () => {
      const randomEndpoint = toCamelCase(getRandomFromArray(posibleEndpoints))
      const badField = 'badField'
      const url = BASE_API_URL + `/${randomEndpoint}/fields/${badField}`

      await api
        .get(url)
        .expect(404)
    })

    test('return 404 if the endpoint provided does not exist', async () => {
      const randomEndpoint = 'badEndpoint'
      const badField = 'badField'
      const url = BASE_API_URL + `/${randomEndpoint}/fields/${badField}`

      await api
        .get(url)
        .expect(404)
    })
  })
})

afterAll(async () => await mongoose.connection.close())
