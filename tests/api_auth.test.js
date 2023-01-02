const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')

beforeEach(async () =>  await User.deleteMany({}))

describe('/api/auth', () => {

  const createUser = async () => {
    const passwordHash = await bcrypt.hash('testpassword', 10)
    const newUser = new User ({
      username: 'testusername',
      password: passwordHash
    })

    await newUser.save()
  }

  describe('/login', () => {
    const url = '/api/auth/login'

    beforeEach(async () => await createUser())

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
    const url = '/api/auth/register'

    test('can sign up if no User is on database', async () => {
      const savedUser = await api
        .post(url)
        .send({
          username: 'registerUsername',
          password: 'registerPassword'
        })
        .expect(200)
      
      expect(savedUser.body.username).toBe('registerUsername')
    })

    test("can't sign up if a User has been created", async () => {
      await createUser()
      await api
        .post(url)
        .send({
          username: 'registerUsername',
          password: 'registerPassword'
        })
        .expect(401)
    })
  })
})

afterAll(() => mongoose.connection.close())