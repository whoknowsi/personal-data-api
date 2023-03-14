const CryptoJS = require('crypto-js')
const User = require('../models/user')

const createUser = async () => {
  const foundUser = await User.findOne({})
  if (foundUser) return

  const testPassword = 'testpassword'
  const passwordHash = CryptoJS.AES.encrypt(testPassword, process.env.SECRET_TOKEN).toString()
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
    description: `This certificate certifies that the holder has successfully completed a 
    Platzi course on the fundamentals of Firebase. The course included the implementation
    of Firebase services on a website, knowledge of the web management console, authentication
    and creation of users through social networks, and deployment of web applications to Firebase
    hosting. Additionally, the holder completed a practical project called PlatziBlog, in which
    javascript vanilla, html, and css were used to implement features such as user authentication
    through email and password, Google, Facebook, and Twitter, as well as the use of Firebase messaging
    for push notifications, Firebase storage for storing images and Firebase hosting for deploying the
    application. Furthermore, Firebase rules were implemented to protect both the database and the storage.`,
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
    description: `This certificate certifies that the holder has successfully completed the 
    Fullstack Open course at the University of Helsinki. The course covered web application
    fundamentals, including an introduction to React and how to communicate with a server
    using NodeJS and Express. It also covered server programming, testing, user administration,
    and state management with Redux. Additionally, the course covered topics such as React router,
    custom hooks, styling with CSS and webpack. This course covered the necessary skills to be a
    full-stack developer, and the certificate is a proof of the knowledge and skills acquired in the course.`,
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
