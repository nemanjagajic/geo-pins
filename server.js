const { ApolloServer } = require('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')
const userController = require('./controllers/userController')
require('dotenv').config()

console.log(process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB connected!'))
  .catch(err => console.error(err))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null
    let currentUser = null
    try {
      authToken = req.headers.authorization
      if (authToken) {
        currentUser = await userController.findOrCreateUser(authToken)
      }
    } catch(err) {
      console.log(`Unable to authenticate user with token ${authToken}`)
    }

    return { currentUser }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`)
})
