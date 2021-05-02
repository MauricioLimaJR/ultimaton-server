'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const MarvelApi = use('App/Models/MarvelApi')

const { COMMON } = require('../../constants/errors')

class MarvelController {
  /**
   * Search characters and comics
   * GET marvel
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async search({ request, response }) {
    try {
      const { query, characters, comics, limit = 4 } = request.get()

      let charactersList = []
      let comicsList = []

      if (characters) {
        const queryResponse = await MarvelApi.getCharacters(query, limit)
        const charactersQueried = queryResponse.data.data.results

        charactersList = charactersQueried.map((character) => {
          const { id, name, description, thumbnail } = character
          return { id, name, description, thumbnail }
        })
      }

      if (comics) {
        const queryResponse = await MarvelApi.getComics(query, limit)
        const comicsQueried = queryResponse.data.data.results

        comicsList = comicsQueried.map((comic) => {
          const { id, title, description, thumbnail } = comic
          return { id, title, description, thumbnail }
        })
      }

      return response.status(200).send({ charactersList, comicsList })
    } catch (err) {
      console.error(err)
      return response.status(500).send({ error: COMMON })
    }
  }
}

module.exports = MarvelController
