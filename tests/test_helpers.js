const bcrypt = require('bcrypt')
const User = require('../models/user')

const createUser = async () => {
  const foundUser = await User.findOne({})
  if (foundUser) return

  const passwordHash = await bcrypt.hash('testpassword', 10)
  const newUser = new User({
    username: 'testusername',
    password: passwordHash
  })

  await newUser.save()
}

const getNonExistingId = async (toSave) => {
  await toSave.save()
  await toSave.remove()

  return toSave._id.valueOf()
}

const fromCameCaseToSnakeCase = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

const allInitialData = {
  certificate: {
    name: 'Firebase',
    expires: false,
    issueDate: '01/12/2022',
    issuingOrganization: 'Platzi',
    credentialId: '4eb5272f-6c7d-420c-8450-e7331bccf8c0',
    credentialURL: 'https://platzi.com/p/echosmania/learning-path/25-firebase/diploma/detalle/'
  },
  deployment: {
    name: 'Sparky Solutions',
    description: 'This website was built using Next.js and pure CSS',
    repoUrl: 'https://github.com/whoknowsi/sparky-solutions',
    url: 'https://whoknowsi.github.io/sparky-solutions/',
    deployedAt: '31/12/2022'
  },
  education: {
    school: 'Universidad de Buenos Aires',
    degree: "Bachelor's degree",
    fieldOfStudy: 'Bachelor of Computer Science',
    startDate: '01/01/2021',
    location: {
      city: 'Buenos Aires',
      country: 'Argentina'
    }
  },
  project: {
    name: 'Sparky Solutions',
    description: `This website was built using Next.js and pure CSS, 
      with the help of the styled components library for a single reusable
      React component. The site is fully responsive and features three pages:
      home, about, and contact us.`,
    createdAt: '31/12/2022',
    status: 'Completed',
    client: 'whoknowsi'
  },
  workExperience: {
    company: 'CEGA Electrónica S.A.',
    title: 'Intern',
    employmentType: 'Internship',
    location: {
      city: 'Mendoza',
      country: 'Argentina'
    },
    locationType: 'On-site',
    startDate: '01/10/2017',
    endDate: '01/11/2017',
    responsabilities: [
      'Assembly and soldering of circuit boards',
      'Quality control',
      'Loading programs onto Arduino systems'
    ]
  }
}

const allDataToCreate = {
  certificate: {
    name: 'Full Stack Open',
    expires: false,
    issueDate: '01/11/2022',
    issuingOrganization: 'University of Helsinki',
    credentialId: '867a851012773dbe7db3d5d71c333a8a',
    credentialURL: 'https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/867a851012773dbe7db3d5d71c333a8a'
  },
  deployment: {
    name: 'Netflix clone',
    description: 'This website is a React clone of Netflix using TMDB API',
    repoUrl: 'https://github.com/whoknowsi/netflixclone',
    url: 'https://whoknowsi.github.io/netflixclone/',
    deployedAt: '02/02/2022'
  },
  education: {
    school: 'Ing. Guillermo Villanueva',
    degree: 'Technical degree',
    fieldOfStudy: 'Electronics Technician with specialization in Automation and Control',
    startDate: '01/01/2010',
    endDate: '01/01/2017',
    location: {
      city: 'Mendoza',
      country: 'Argentina'
    }
  },
  project: {
    name: 'Netflix clone',
    description: 'A Netflix clone made with React using TMDB API',
    createdAt: '02/02/2022',
    status: 'Completed',
    client: 'whoknowsi'
  },
  workExperience: {
    title: 'Freelance Web Developer',
    employmentType: 'Self-employed',
    locationType: 'Remote',
    startDate: '01/01/2022',
    endDate: '02/01/2023',
    skills: [
      'React Native',
      'Desarrollo front end',
      'Desarrollo web back end',
      'Express.js',
      'Firebase',
      'Node.js',
      'Next.js',
      'Desarrollo Full Stack',
      'JavaScript',
      'React.js'
    ]
  }
}

const allDataToUpdate = {
  certificate: {
    name: 'Firebase updated'
  },
  deployment: {
    name: 'Sparky Solutions updated'
  },
  education: {
    school: 'Universidad de Buenos Aires updated'
  },
  project: {
    name: 'Sparky Solutions updated'
  },
  workExperience: {
    company: 'CEGA Electrónica S.A. updated'
  }
}
module.exports = {
  createUser,
  getNonExistingId,
  fromCameCaseToSnakeCase,
  allInitialData,
  allDataToCreate,
  allDataToUpdate
}
