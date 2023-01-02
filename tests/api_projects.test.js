const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Project = require('../models/project')
const { mongooseDateToYYYYMMDD } = require('../utils/helpers')
const { createUser } = require('./test_helpers')

let token = null

beforeAll(async () => {
  await Project.deleteMany({})
  await createUser()
})

describe('/api/projects' ,() => {
  const url = '/api/projects'

  const initialProject = {
    name: "Sparky Solutions",
    description: `This website was built using Next.js and pure CSS, 
      with the help of the styled components library for a single reusable
      React component. The site is fully responsive and features three pages:
      home, about, and contact us.`,
    createdAt: "2022/12/31",
    status: "Completed",
    client: "whoknowsi"
  }

  const toCreate = {
    name: "Netflix clone",
    description: "A Netflix clone made with React using TMDB API",
    createdAt: "2022/02/02",
    status: "Completed",
    client: "whoknowsi"
  }

  beforeAll(async () => {
    const project = new Project(initialProject)
    await project.save()
  })

  test('can get all projects', async () => {
    const result = await api
      .get(url)
      .expect(200)
    
    const project = result.body.projects[0]
    expect({
      ...project,
      createdAt: mongooseDateToYYYYMMDD(project.createdAt),
    }).toMatchObject(initialProject)
  })

  describe('when user is not logged in', () => {
    test("can't create a project", async () => {
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

    test("can create a project if the data provided is correct", async () => {
      const result = await api
        .post(url)
        .send(toCreate)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      
      const project = result.body.project
      expect({
        ...project,
        createdAt: mongooseDateToYYYYMMDD(project.createdAt),
      }).toMatchObject(toCreate)
    })

    test("can't create a project if data is not correct (missing or invalidad fields)", async () => {
      await api
        .post(url)
        .send({})
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })
})

afterAll(async () => await mongoose.connection.close())