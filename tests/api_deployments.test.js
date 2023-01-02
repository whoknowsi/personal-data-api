const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Deployment = require('../models/deployment')
const { mongooseDateToYYYYMMDD } = require('../utils/helpers')
const { createUser } = require('./test_helpers')

let token = null

beforeAll(async () => {
  await Deployment.deleteMany({})
})

describe('/api/deployments' ,() => {
  const url = '/api/deployments'

  const initialDeployment = {
    name: "Sparky Solutions",
    description: "This website was built using Next.js and pure CSS",
    repoUrl: "https://github.com/whoknowsi/sparky-solutions",
    url: "https://whoknowsi.github.io/sparky-solutions/",
    deployedAt: "2022/12/31"
  }

  const toCreate = {
    name: "Netflix clone",
    description: "This website is a React clone of Netflix using TMDB API",
    repoUrl: "https://github.com/whoknowsi/netflixclone",
    url: "https://whoknowsi.github.io/netflixclone/",
    deployedAt: "2022/02/02"
  }

  beforeAll(async () => {
    const deployment = new Deployment(initialDeployment)
    await deployment.save()
  })

  test('can get all deployments', async () => {
    const result = await api
    .get(url)
    .expect(200)
    
    const certificate = result.body.deployments[0]
    expect({...certificate, deployedAt: mongooseDateToYYYYMMDD(certificate.deployedAt)}).toMatchObject(initialDeployment)
  })

  describe('when user is not logged in', () => {
    test("can't create a deployment", async () => {
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

    test("can create a deployment is the data provided is correct", async () => {
      const result = await api
        .post(url)
        .send(toCreate)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      
      const deployment = result.body.deployment
      console.log(deployment)
      expect({...deployment, deployedAt: mongooseDateToYYYYMMDD(deployment.deployedAt)}).toMatchObject(toCreate)
    })

    test("can't create a deployment if data is not correct (missing or invalidad fields)", async () => {
      await api
        .post(url)
        .send({})
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})