const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const fields = require('../config/fields')
const { getRandomFromArray, toCamelCase } = require('../utils/helpers')

const posibleEndpoints = [
  "certificates",
  "deployments",
  "educations",
  "projects",
  "work-experiences"
]

describe('/api/:endpoint/fields', () => {
  test('can get all fields of a endpoint', async () => {
    const randomEndpoint = toCamelCase(getRandomFromArray(posibleEndpoints))
    const url = `/api/${randomEndpoint}/fields`
  
    const result = await api
      .get(url)
      .expect(200)
    
    expect(result.body).toEqual(fields[randomEndpoint])
  })
  
  test('return 404 if endpoint provided does not exist', async () => {
    const badEndpoint = "badEndpoint"
    const url = `/api/${badEndpoint}/fields`
  
    await api
      .get(url)
      .expect(404)
  })

  describe('/:field', () => {
    test('return the correct field details if exists', async () => {
      const randomEndpoint = toCamelCase(getRandomFromArray(posibleEndpoints))
      const randomField = getRandomFromArray(Object.keys(fields[randomEndpoint]))
      const url = `/api/${randomEndpoint}/fields/${randomField}`

      const field = fields[randomEndpoint][randomField]

      const isArray = Array.isArray(field)
      const expectedField =
        isArray
          ? { field: { type: [...field], fieldName: randomField } }
          : { field: { ...field, fieldName: randomField } }

      const result = await api
        .get(url)
        .expect(200)
      
      expect(result.body).toEqual(expectedField)
    })
  })

  test('return 404 if the field provided does not exist', async () => {
    const randomEndpoint = toCamelCase(getRandomFromArray(posibleEndpoints))
    const badField = 'badField'
    const url = `/api/${randomEndpoint}/fields/${badField}`

    await api
      .get(url)
      .expect(404)
  })

  test('return 404 if the endpoint provided does not exist', async () => {
    const randomEndpoint = 'badEndpoint'
    const badField = 'badField'
    const url = `/api/${randomEndpoint}/fields/${badField}`

    await api
      .get(url)
      .expect(404)
  })
})

afterAll(() => mongoose.connection.close())