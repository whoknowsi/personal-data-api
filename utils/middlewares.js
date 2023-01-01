const jwt = require('jsonwebtoken')

const tokenExtractor = (req, _, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

const checkAuthentication = (req, res, next) => {
  const token = req.token
  const unauthorizedMsg = 'Unauthorized - You do not have permission to perform this action.'

  if (!token) return res.status(401).json({ error: unauthorizedMsg })

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)

    if (!decodedToken.id) return res.status(401).json({ error: unauthorizedMsg })

    req.username = decodedToken.username
    req.id = decodedToken.id

    next()
  } catch (error) {
    return res.status(401).json({ error })
  }
}

module.exports = {
  tokenExtractor,
  checkAuthentication
}
