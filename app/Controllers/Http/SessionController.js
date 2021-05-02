'use strict'

const User = use('App/Models/User')
const { NOT_FOUND_OR_NOT_REGISTRED } = require('../../constants/errors')

class SessionController {
  async create({ request, response, auth }) {
    const { email, password } = request.all()

    try {
      const token = await auth.attempt(email, password)

      const queryRes = await User.query()
        .where('email', email)
        .select('firstname', 'lastname', 'email')
        .fetch()
      const user = queryRes.first()

      return response.json({ user, token })
    } catch (error) {
      console.error(error)
      return response.notFound(NOT_FOUND_OR_NOT_REGISTRED)
    }
  }
}

module.exports = SessionController
