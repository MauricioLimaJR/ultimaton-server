'use strict'

class FavouriteCharacterController {
}

module.exports = FavouriteCharacterController


'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const FavouriteCharacter = use('App/Models/FavouriteCharacter')

/**
 * Resourceful controller for interacting with favourite characters
 */
class FavouriteCharacterController {
  /**
   * List all favourite characters
   * GET favourites/characters/?user_id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    try {
      const { user_id } = request.all()

      const favouriteCharacters = FavouriteCharacter
        .query()
        .where('user_id', user_id)
        .fetch()

      return favouriteCharacters
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }

  /**
   * Create/save a new favourite character.
   * POST favourites/characters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['character_id'])
      const user_id = auth.user.id

      const favouriteCharacter = await FavouriteCharacter.create({ ...data, user_id })

      return favouriteCharacter
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }

  /**
   * Delete a favourite character with id.
   * DELETE favourites/characters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      const { id } = params

      const favouriteCharacter = await FavouriteCharacter.find(id)

      await favouriteCharacter.delete()
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }
}

module.exports = FavouriteCharacterController
