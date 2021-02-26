'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const FavouriteComic = use('App/Models/FavouriteComic')

/**
 * Resourceful controller for interacting with favourite comics
 */
class FavouriteComicController {
  /**
   * List all favourite comics
   * GET favourites/comics/?user_id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    try {
      const { user_id } = request.all()

      const favouriteComics = FavouriteComic
        .query()
        .where('user_id', user_id)
        .fetch()

      return favouriteComics
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }

  /**
   * Create/save a new favourite comic.
   * POST favourites/comics
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['comic_id'])
      const user_id = auth.user.id

      const favouriteComic = await FavouriteComic.create({ ...data, user_id })

      return favouriteComic
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }

  /**
   * Delete a favourite comic with id.
   * DELETE favourites/comics/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      const { id } = params

      const favouriteComic = await FavouriteComic.find(id)

      await favouriteComic.delete()
    } catch (err) {
      return response.status(500).send({ error: err.message })
    }
  }
}

module.exports = FavouriteComicController
