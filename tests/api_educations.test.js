const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Education = require('../models/education')
const { mongooseDateToYYYYMMDD } = require('../utils/helpers')
const { createUser } = require('./test_helpers')

let token = null

beforeAll(async () => {
  await Education.deleteMany({})
  await createUser()
})

describe('/api/educations' ,() => {
  const url = '/api/educations'

  const initialEducation = {
    school: "Universidad de Buenos Aires",
    degree: "Bachelor's degree",
    fieldOfStudy: "Bachelor of Computer Science",
    startDate: "2021/01/01",
    location: {
        city: "Buenos Aires",
        country: "Argentina"
    }
  }   

  const toCreate = {
    school: "Ing. Guillermo Villanueva",
    degree: "Technical degree",
    fieldOfStudy: "Electronics Technician with specialization in Automation and Control",
    startDate: "2010/01/01",
    endDate: "2017/01/01",
    location: {
      city: "Mendoza",
      country: "Argentina"
    }
  }

  beforeAll(async () => {
    const education = new Education(initialEducation)
    await education.save()
  })

  test('can get all educations', async () => {
    const result = await api
      .get(url)
      .expect(200)
    
    const education = result.body.educations[0]
    expect({
      ...education,
      startDate: mongooseDateToYYYYMMDD(education.startDate),
      endDate: mongooseDateToYYYYMMDD(education.endDate)
    }).toMatchObject(initialEducation)
  })

  describe('when user is not logged in', () => {
    test("can't create a education", async () => {
      await api
        .post(url)
        .send(toCreate)
        .expect(401)
    })
  })

  describe('when user is logged in', () => {
    beforeAll(async () => {
      const result = await api
        .post('/api/auth/login')
        .send({
          username: 'testusername',
          password: 'testpassword'
        })
      
      token = result.body.token
    })

    test("can create a education if the data provided is correct", async () => {
      const result = await api
        .post(url)
        .send(toCreate)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      
      const education = result.body.education
      expect({
        ...education,
        startDate: mongooseDateToYYYYMMDD(education.startDate),
        endDate: mongooseDateToYYYYMMDD(education.endDate)
      }).toMatchObject(toCreate)
    })

    test("can't create a education if data is not correct (missing or invalidad fields)", async () => {
      await api
        .post(url)
        .send({})
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })
})

afterAll(async () => await mongoose.connection.close())