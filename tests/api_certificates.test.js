const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Certificate = require('../models/certificate')
const { mongooseDateToYYYYMMDD } = require('../utils/helpers')
const { createUser } = require('./test_helpers')

let token = null

beforeAll(async () => {
  await Certificate.deleteMany({})
  await createUser()
})

describe('/api/certificates', () => {
  const url = '/api/certificates'

  const initialCertificate = {
    name: "Firebase",
    expires: false,
    issueDate: "2022/12/01",
    issuingOrganization: "Platzi",
    credentialId: "4eb5272f-6c7d-420c-8450-e7331bccf8c0",
    credentialURL: "https://platzi.com/p/echosmania/learning-path/25-firebase/diploma/detalle/"
  }

  const toCreate = {
    name: "Full Stack Open",
    expires: false,
    issueDate: "2022/11/01",
    issuingOrganization: "University of Helsinki",
    credentialId: "867a851012773dbe7db3d5d71c333a8a",
    credentialURL: "https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/867a851012773dbe7db3d5d71c333a8a"
  }

  beforeAll(async () => {
    const certificate = new Certificate(initialCertificate)
    await certificate.save()
  })

  test('can get all certificates', async () => {
    const result = await api
      .get(url)
      .expect(200)
    
    const certificate = result.body.certificates[0]
    expect({...certificate, issueDate: mongooseDateToYYYYMMDD(certificate.issueDate)}).toMatchObject(initialCertificate)
  })

  describe('when user is not logged in', () => {
    test("can't create a certificate", async () => {
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

    test("can create a certificate is the data provided is correct", async () => {
      const result = await api
        .post(url)
        .send(toCreate)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      
      const certificate = result.body.certificate
      expect({...certificate, issueDate: mongooseDateToYYYYMMDD(certificate.issueDate)}).toMatchObject(toCreate)
    })

    test("can't create a certificate if data is not correct (missing or invalidad fields)", async () => {
      await api
        .post(url)
        .send({})
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })
})

afterAll(async () => await mongoose.connection.close())