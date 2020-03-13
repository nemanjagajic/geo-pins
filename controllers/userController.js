const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

exports.findOrCreateUser = async token => {
  const googleUser = await verifyAuthToken(token)
  const user = await checkIfUserExists(googleUser.email)

  return user ? user : createNewUser(googleUser)
}

const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    })

    return ticket.getPayload()
  } catch(err) {
    console.log(err)
  }
}

const checkIfUserExists = async email => User.findOne({ email })

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser
  const user = { name, email, picture }
  return new User(user).save()
}
