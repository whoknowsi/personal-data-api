const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Certificate = require('../models/certificate')
const { mongooseDateToYYYYMMDD } = require('../utils/helpers')
const { createUser } = require('./test_helpers')

let token = null
let idToManage = null

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

  const toUpdate = {
    name: "Firebase certificate"
  }

  beforeAll(async () => {
    const certificate = new Certificate(initialCertificate)
    const savedCertificate = await certificate.save()
    idToManage = savedCertificate._id.valueOf()
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

    test("can't update a certificate", async () => {
      await api
      .put(`${url}/${idToManage}`)
      .send(toUpdate)
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

    describe('when trying to create a certificate', () => {
      test("can be created is the data provided is correct", async () => {
        const result = await api
          .post(url)
          .send(toCreate)
          .set('Authorization', `Bearer ${token}`)
          .expect(201)
        
        const certificate = result.body.certificate
        expect({...certificate, issueDate: mongooseDateToYYYYMMDD(certificate.issueDate)}).toMatchObject(toCreate)
      })
  
      test("can't be created if data is not correct (missing or invalidad fields)", async () => {
        await api
          .post(url)
          .send({})
          .set('Authorization', `Bearer ${token}`)
          .expect(400)
      })
    })

    describe('when updating a certificate', () => {
      describe('and the certificates exists (provided id is correct)', () => {
        test("updates the certificate if data sent is correct", async () => {
          await api
            .put(`${url}/${idToManage}`)
            .send(toUpdate)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        })
    
        test("no updates the certificate if data types is not correct", async () => {
          await api
            .put(`${url}/${idToManage}`)
            .send({
              name: ["hola"]
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
        })
    
        test("there is no changes if data is not on schema or nothing is sent", async () => {
          await api
            .put(`${url}/${idToManage}`)
            .send({
              notInSchema: "Nothing"
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        })
      })
      describe('and the certificates does not exists (provided id is correct)', () => {
        test("responds with status 400", async () => {
          await api
            .put(`${url}/badId`)
            .send(toUpdate)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
        })
      })
    })
  })
})

afterAll(async () => await mongoose.connection.close())