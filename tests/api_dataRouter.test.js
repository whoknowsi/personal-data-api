const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../functions/api')
const api = supertest(app)
const dataModels = require('../models/dataModels')
const { BASE_API_URL } = require('../config/config')

const {
  createUser,
  getNonExistingId,
  fromCameCaseToSnakeCase,
  allInitialData,
  allDataToCreate,
  allDataToUpdate
} = require('./test_helpers')

beforeAll(async () => {
  for (const key in dataModels) {
    const Model = dataModels[key]
    await Model.deleteMany({})
  }

  await createUser()
})

describe.each((Object.values(dataModels)))('test', (Model) => {
  const loginUrl = BASE_API_URL + '/auth/login'
  let dataName = Model.collection.modelName.replace(/^./, (m) => m.toLowerCase())
  let endpoint
  let idOfInitialData
  let token
  let url
  let initialData
  let dataToCreate
  let dataToUpdate

  beforeAll(async () => {
    dataName = Model.collection.modelName.replace(/^./, (m) => m.toLowerCase())
    endpoint = fromCameCaseToSnakeCase(dataName + 's')
    url = BASE_API_URL + `/${endpoint}`
    initialData = {
      en: allInitialData.en[dataName],
      es: allInitialData.es[dataName]
    }

    dataToCreate = {
      en: allDataToCreate.en[dataName],
      es: allDataToCreate.es[dataName]
    }
    dataToUpdate = {
      en: allDataToUpdate.en[dataName],
      es: allDataToUpdate.es[dataName]
    }

    console.log(dataToUpdate)

    const data = new Model(initialData)
    const savedData = await data.save()
    idOfInitialData = savedData._id.valueOf()
  })

  describe('using GET method', () => {
    test('return 404 if endpoint is invalid', async () => {
      await api
        .get('/badEndpoint')
        .expect(404)
    })

    test('return 404 if endpoint is invalid when trying to get specific item', async () => {
      await api
        .get(BASE_API_URL + `/badEndpoint/${idOfInitialData}`)
        .expect(404)
    })

    test(`can get all ${dataName}s`, async () => {
      const result = await api
        .get(url)
        .expect(200)

      const data = result.body.results[0]

      expect(data).toMatchObject(initialData)
    })

    test(`can get a specific ${dataName} if id provided is correct`, async () => {
      const result = await api
        .get(`${url}/${idOfInitialData}`)
        .expect(200)

      const data = result.body.result
      expect(data.id).toBe(idOfInitialData)
    })

    test(`return a 404 status with message "${Model.collection.modelName} not found" if provided id is not found`, async () => {
      const nonExistingId = await getNonExistingId(new Model(initialData))
      const result = await api
        .get(`${url}/${nonExistingId}`)
        .expect(404)

      expect(result.body.message).toBe(`${Model.collection.modelName} not found`)
    })

    test('return a 400 status if id is malformed', async () => {
      await api
        .get(`${url}/malformedId`)
        .expect(400)
    })
  })

  describe('when user is not logged in', () => {
    test(`can't create a ${dataName}`, async () => {
      await api
        .post(url)
        .send(dataToCreate)
        .expect(401)
    })

    test(`can't update a ${dataName}`, async () => {
      await api
        .put(`${url}/${idOfInitialData}`)
        .send(dataToUpdate)
        .expect(401)
    })

    test(`can't delete a ${dataName}`, async () => {
      await api
        .delete(`${url}/${idOfInitialData}`)
        .expect(401)
    })
  })

  describe('when user is logged in', () => {
    beforeAll(async () => {
      const result = await api
        .post(loginUrl)
        .send({
          username: 'testusername',
          password: 'testpassword'
        })

      token = result.body.token
    })

    describe('if endpoint is invalid return 404', () => {
      test('POST method', async () => {
        await api
          .post('/badEndpoint')
          .set('Authorization', `Bearer ${token}`)
          .expect(404)
      })

      test('PUT method', async () => {
        await api
          .put(BASE_API_URL + `/badEndpoint/${idOfInitialData}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(404)
      })

      test('DELETE method', async () => {
        await api
          .delete(BASE_API_URL + `/badEndpoint/${idOfInitialData}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(404)
      })
    })

    describe(`using POST method when trying to create a ${dataName}:`, () => {
      test('is created if the data provided is correct', async () => {
        const result = await api
          .post(url)
          .send(dataToCreate)
          .set('Authorization', `Bearer ${token}`)
          .expect(201)

        const data = result.body.result
        expect(data).toMatchObject(dataToCreate)
      })

      test('can\'t be created if data is not correct (missing or invalidad fields)', async () => {
        await api
          .post(url)
          .send({})
          .set('Authorization', `Bearer ${token}`)
          .expect(400)
      })
    })

    describe(`using PUT method when trying to update a ${dataName}`, () => {
      describe(`and the ${dataName} exists (provided id is valid)`, () => {
        test('updates it if data sent is correct', async () => {
          await api
            .put(`${url}/${idOfInitialData}`)
            .send(dataToUpdate)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        })

        test('return 400 if data types is not correct', async () => {
          const fieldName = Object.keys(dataToUpdate)[0]
          const objectWithInvalidType = {}
          objectWithInvalidType[fieldName] = []

          await api
            .put(`${url}/${idOfInitialData}`)
            .send(objectWithInvalidType)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
        })

        test('does nothing if data is not on schema or nothing is sent', async () => {
          await api
            .put(`${url}/${idOfInitialData}`)
            .send({
              notInSchema: 'Nothing'
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        })
      })

      test(`return a 404 status with message "${Model.collection.modelName} not found" if provided id is not found`, async () => {
        const nonExistingId = await getNonExistingId(new Model(initialData))

        const result = await api
          .put(`${url}/${nonExistingId}`)
          .send(dataToUpdate)
          .set('Authorization', `Bearer ${token}`)
          .expect(404)

        expect(result.body.message).toBe(`${Model.collection.modelName} not found`)
      })

      test('responds with status 400 if the provided id is malformed', async () => {
        await api
          .put(`${url}/badId`)
          .send(dataToUpdate)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)
      })
    })

    describe(`using DELETE method when trying to delete a ${dataName}`, () => {
      test('deletes it if the provided id is valid', async () => {
        const responseBeforeDelete = await api
          .get(url)

        await api
          .delete(`${url}/${idOfInitialData}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)

        const responseAfterDelete = await api
          .get(url)
        expect(responseAfterDelete.body.results.length).toBe(responseBeforeDelete.body.results.length - 1)
      })

      test('does nothing if the provided id is not valid', async () => {
        const nonExistingId = await getNonExistingId(new Model(initialData))

        const responseBeforeDelete = await api.get(url)

        await api
          .delete(`${url}/${nonExistingId}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)

        const responseAfterDelete = await api.get(url)
        expect(responseAfterDelete.body.results.length).toBe(responseBeforeDelete.body.results.length)
      })

      test('respons with status 400 if the id provided is malformed', async () => {
        await api
          .delete(`${url}/badId`)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)
      })
    })
  })
})

afterAll(async () => await mongoose.connection.close())
