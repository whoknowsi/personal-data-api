const User = require('../models/user')
const supertest = require('supertest')
const app = require('../functions/api')
const api = supertest(app)
const mongoose = require('mongoose')
const { createUser } = require('./test_helpers.js')
const { BASE_API_URL } = require('../config/config')

beforeAll(async () => {
  await User.deleteMany({})
  await createUser()
})

describe('/auth', () => {
  describe('/login', () => {
    const url = BASE_API_URL + '/auth/login'

    test('can login with correct username and password', async () => {
      const response = await api
        .post(url)
        .send({
          username: 'testusername',
          password: 'testpassword'
        })
        .expect(200)

      expect(Object.keys(response.body)[0]).toBe('token')
    })

    test("can't login with incorrect username", async () => {
      await api
        .post(url)
        .send({
          username: 'badusername',
          password: 'testpassword'
        })
        .expect(401)
    })

    test("can't login with incorrect password", async () => {
      await api
        .post(url)
        .send({
          username: 'testusername',
          password: 'badpassword'
        })
        .expect(401)
    })
  })

  describe('/register', () => {
    const url = BASE_API_URL + '/auth/register'

    test('can sign up if no User is on database', async () => {
      await User.deleteMany({})
      const savedUser = await api
        .post(url)
        .send({
          username: 'testusername',
          password: 'testpassword'
        })
        .expect(200)
      expect(savedUser.body.username).toBe('testusername')
    })

    test("can't sign up if a User has been created", async () => {
      createUser()
      await api
        .post(url)
        .send({
          username: 'testusername',
          password: 'testpassword'
        })
        .expect(401)
    })
  })
})

afterAll(async () => await mongoose.connection.close())
