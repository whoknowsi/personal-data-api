const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const WorkExperience = require('../models/workExperience')
const { mongooseDateToYYYYMMDD } = require('../utils/helpers')
const { createUser } = require('./test_helpers')

let token = null

beforeAll(async () => {
  await WorkExperience.deleteMany({})
  await createUser()
})

describe('/api/work-experiences' ,() => {
  const url = '/api/work-experiences'

  const initialWorkExperience = {
    company: "CEGA Electrónica S.A.",
    title: "Intern",
    employmentType: "Internship",
    location: {
        city: "Mendoza",
        country: "Argentina",
    },
    locationType: "On-site",
    startDate: "2017/10/01",
    endDate: "2017/11/01",
    responsabilities: [
        "Assembly and soldering of circuit boards",
        "Quality control",
        "Loading programs onto Arduino systems"
    ]
  }

  const toCreate = {
    title: "Freelance Web Developer",
    employmentType: "Self-employed",
    locationType: "Remote",
    startDate: "2022/01/01",
    endDate: "2023/01/02",
    skills: [
      "React Native",
      "Desarrollo front end",
      "Desarrollo web back end",
      "Express.js",
      "Firebase",
      "Node.js",
      "Next.js",
      "Desarrollo Full Stack",
      "JavaScript",
      "React.js"
    ]
  }

  beforeAll(async () => {
    const workExperience = new WorkExperience(initialWorkExperience)
    await workExperience.save()
  })

  test('can get all work experience', async () => {
    const result = await api
      .get(url)
      .expect(200)
    
    const workExperience = result.body.workExperiences[0]
    expect({
      ...workExperience,
      startDate: mongooseDateToYYYYMMDD(workExperience.startDate),
      endDate: mongooseDateToYYYYMMDD(workExperience.endDate),
    }).toMatchObject(initialWorkExperience)
  })

  describe('when user is not logged in', () => {
    test("can't create a work experience", async () => {
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

    test("can create a work experience if the data provided is correct", async () => {
      const result = await api
        .post(url)
        .send(toCreate)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      
      const workExperience = result.body.workExperience
      expect({
        ...workExperience,
        startDate: mongooseDateToYYYYMMDD(workExperience.startDate),
        endDate: mongooseDateToYYYYMMDD(workExperience.endDate),
      }).toMatchObject(toCreate)
    })

    test("can't create a work experience if data is not correct (missing or invalidad fields)", async () => {
      await api
        .post(url)
        .send({})
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })
})

afterAll(async () => await mongoose.connection.close())